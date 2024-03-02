import { NextRequest } from "next/server";
import { StreamingTextResponse, LangChainStream } from "ai";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import { CallbackManager } from "langchain/callbacks";
import { VectorDBQAChain } from "langchain/chains";
import prismadb from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export async function POST(request: NextRequest) {
  // Authorize users to protect your action
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Extract the messages from the body of the request
  const { messages, fileKey, documentId } = await request.json();

  console.log('JF - fileKey:', fileKey);

  console.log('JF - messages:', messages);
  // Get input query from messages array
  const query = messages[messages.length - 1].content;

  console.log('JF - query:', query);

  // Use Vercel's ai package to setup a stream
  const { stream, handlers } = LangChainStream();

  // Initialize Pinecone Client
  const pinecone = new Pinecone();

  // Connect to the Index
  const index = pinecone.Index(process.env.PINECONE_INDEX!);

  // Get Vector Store
  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings(),
    {
      pineconeIndex: index,
      namespace: fileKey,
    }
  );

  // OpenAI model
  const model = new OpenAI({
    modelName: "gpt-3.5-turbo",
    streaming: true,
    callbackManager: CallbackManager.fromHandlers(handlers),
  });

  // Langchain chain
  const chain = VectorDBQAChain.fromLLM(model, vectorStore, {
    k: 3,
    returnSourceDocuments: true,
  });

  console.log('chain', chain);

  // Call this chain with the query from the user
  chain
    .call(
        { query })
    .catch(console.error);

  return new StreamingTextResponse(stream);
}


