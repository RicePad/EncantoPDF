import PDFViewer from "@/components/PDFViewer";
import Chat from "@/components/Chat";
import { getDocument } from "@/actions/prisma";
import { revalidatePath } from "next/cache";

interface Props {
  params: {
    id: string;
  }
}
const ChatPage = async ({ params: { id }}: Props) => {
   
  console.log('JF', id);
  const { document } = await getDocument(id);


  if(!document) {
    revalidatePath('/documents')
  }

    const s3Url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_S3_BUCKET_REGION}.amazonaws.com/${document.fileKey}`;

    return (
      <div className="flex">
        <PDFViewer url={s3Url} />
        <Chat/>
      </div>
    );
  };
  

export default ChatPage;  