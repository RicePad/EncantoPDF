"use server";

import { currentUser, useAuth } from "@clerk/nextjs";
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
        include: {
          messages: {
            orderBy: { createdAt: "asc" },
          },
        },
      });
    

    return { document };
};




export const updateDocument = async (documentId: string, formData: FormData) => {

    const user = await currentUser();
    if (!user || !user.id || !user.firstName) {
        throw new Error("Unauthorized");
    }

    const fileName = formData.get("documentName") as string;

    
    
    const document = await prismadb.document.update({
        where: {
          id: documentId,
          userId: user.id,
        },
        data: {
          fileName,
        },
      });

    revalidatePath("/documents");
};

export const deleteDocument =  async (documentId: string) => {
    const user =  await currentUser();
    if (!user || !user.id || !user.firstName){
        throw new Error("Unauthorized user");
        
    }


    const document = await prismadb.document.delete(
        {
            where: {
                id: documentId,
                userId: user.id,
            },
        }
    );

    revalidatePath("/documents");
}


