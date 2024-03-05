import { NextRequest } from "next/server";
import { StreamingTextResponse, LangChainStream } from "ai";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import { CallbackManager } from "langchain/callbacks";
import { VectorDBQAChain } from "langchain/chains";
import { Role } from "@prisma/client";
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

  // Get input query from messages array
  const query = messages[messages.length - 1].content;

  // Create message from user
  await saveMessage(documentId, "user", query, userId);

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

  // Call this chain with the query from the user
  chain
    .call({ query })
    .then(async (res) => {
      if (res) {
        // Create message for assistant (AI)
        await saveMessage(documentId, "assistant", res.text, userId);
      }
    })
    .catch(console.error);

  return new StreamingTextResponse(stream);
}

async function saveMessage(
  documentId: string,
  role: Role,
  content: string,
  userId: string
) {
  const document = await prismadb.document.update({
    where: {
      id: documentId,
      userId,
    },
    data: {
      messages: {
        create: {
          content,
          role,
        },
      },
    },
  });

  return document;
}
