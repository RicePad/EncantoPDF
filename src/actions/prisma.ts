"use server";

import { currentUser } from "@clerk/nextjs";
import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createDocument = async (
  fileName: string,
  fileSize: number,
  fileKey: string
) => {
  const user = await currentUser();

  if (!user || !user.id || !user.firstName) {
    throw new Error("Unauthorized");
  }

  const document = await prismadb.document.create({
    data: {
      userId: user.id,
      userName: user.firstName,
      fileName,
      fileSize,
      fileKey,
    },
  });

  revalidatePath("/documents");

  return { document };
};

export const getDocument = async (documentId: string) => {
    const user = await currentUser();
    if (!user || !user.id || !user.firstName) {
      throw new Error("Unauthorized!");
    }
  
    const document = await prismadb.document.findUnique({
      where: {
        id: documentId,
        userId: user.id,
      },
    });
  
    return { document };
  };