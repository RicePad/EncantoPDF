"use server";

import { auth } from "@clerk/nextjs";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { Document } from "langchain/document";
import { CharacterTextSplitter } from "langchain/text_splitter";

import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

export const embedPDFToPinecone = async (fileKey: string) => {
    const { userId } = auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    let pdfFile = await fetch(
        `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_S3_BUCKET_REGION}.amazonaws.com/${fileKey}`
    );

    console.log("PineCone PDF file:", pdfFile);

    // Step #1 - Split text into small chunks

    let pdfArray = await pdfFile.arrayBuffer();
    console.log("PDF array:", pdfFile);

    const blob = new Blob([pdfArray]);
    console.log("PineCone blob arrayBuffer:", blob);

    const loader = new PDFLoader(blob);
    console.log("PineCone Loader: ", loader);

    const docs = await loader.load();
    console.log("PineCone doc:", docs);

    const trimmedDoc = docs.map((doc) => {
        const metadata = { ...doc.metadata };
        console.log("metada", metadata);

        delete metadata.pdf;

        return new Document({
            pageContent: doc.pageContent,
            metadata: metadata,
        });
    });

    console.log("trimmedDocs", trimmedDoc);

    // Step #2 - Split document into smaller chunks
    const splitter = new CharacterTextSplitter({
        separator: " ",
        chunkSize: 500,
        chunkOverlap: 10,
    });

    const splitDocs = await splitter.splitDocuments(trimmedDoc);
    console.log("splitDocs", splitDocs);


    // Step #3 = Initialize Pinecone
    const pinecone = new Pinecone();

    // Step #4 - Connect to the Pinecone Index
    const index = pinecone.Index(process.env.PINECONE_INDEX!);
    
    // Step #5 - Embedings documents
    await PineconeStore.fromDocuments(splitDocs, new OpenAIEmbeddings(), {
        pineconeIndex: index,
    });
};
