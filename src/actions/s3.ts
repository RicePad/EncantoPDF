"use server";

import { auth } from "@clerk/nextjs";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";


export const generatePreSignedURL = async (fileName: string, fileType: string) => {

    const { userId } = auth();

    if(!userId) {
        throw new Error("unauthorized");
    }



    const client = new S3Client({
        region:  process.env.NEXT_PUBLIC_S3_BUCKET_REGION!,
        credentials: {
            accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
            secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY_ID!,
        },
    })

    if(!fileName || !fileType) {
        throw new Error("There was an error with the PDF FILE");
        
    }


    const fileKey =  `users/${userId}/${Date.now()}-${fileName}`;


    // PutObjectCommand: used to generate a pre-signed URL for uploading
    const putCommand = new PutObjectCommand({
        Key: fileKey,
        ContentType: fileType,
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
    })


  

    const putUrl = await getSignedUrl(client, putCommand, {expiresIn: 60});

    return { putUrl, fileKey}
}

export const deleteS3PDF = async (fileKey: string) => {
    // Authorize users to protect your action
    const { userId } = auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }
  
    // Initialize S3Client instance
    const client = new S3Client({
      region: process.env.NEXT_PUBLIC_S3_BUCKET_REGION!,
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY_ID!,
      },
    });
  
    if (!fileKey) {
      throw new Error("Could not find the file!");
    }
  
    const command = new DeleteObjectCommand({
      Key: fileKey,
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
    });
  
    await client.send(command);
  };
  