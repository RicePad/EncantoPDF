import { getDocument } from "@/actions/db";
import Chat from "@/components/Chat";
import PDFViewer from "@/components/PDFViewer";
import { redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

const ChatPage = async ({ params: { id } }: Props) => {
  const { document } = await getDocument(id);

  if (!document) {
    return redirect("/documents");
  }

  const s3Url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_S3_BUCKET_REGION}.amazonaws.com/${document.fileKey}`;

  return (
    <div className="flex">
      <PDFViewer url={s3Url} />
      <Chat document={document} />
    </div>
  );
};

export default ChatPage;
