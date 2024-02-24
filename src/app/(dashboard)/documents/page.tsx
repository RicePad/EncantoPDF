import UploadPDF from "@/components/UploadPDF";
import UpdatePDF from "@/components/UpdatePDF";
import { Button } from "@/components/ui/button";
import prismadb from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { File, Pencil, Trash2, Upload } from "lucide-react";
import Link from "next/link";
import { formatBytes } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import DeletePDF from "@/components/DeletePDF";



const Documents = async () => {


  const { userId } = auth();

  const documents = await prismadb.document.findMany({
    where: {
      userId: userId as string,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <section className="bg-[#faf9f6] min-h-screen">
      <div className="section-container">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl">Documents</h1>
          <UploadPDF />
        </div>

        <div className="bg-white rounded shadow w-full overflow-x-scroll">
          <table className="min-w-full">
            <tbody>
              {documents.map((d, index) => (
                <tr
                  key={index}
                  className={
                    index === documents.length - 1
                      ? ""
                      : "border-b border-gray-200"
                  }
                >
                  <td className="p-4 text-left flex items-center">
                    <File
                      className="w-4 h-4 mr-2"
                      style={{ strokeWidth: "3" }}
                    />
                    <Link href={`/documents/${d.id}`}>
                      <span className="text-ellipsis overflow-hidden whitespace-normal max-w-[300px] text-sm font-medium">
                        {d.fileName}
                      </span>
                    </Link>
                  </td>
                  <td className="p-4 text-right text-sm text-gray-500 whitespace-nowrap w-20">
                    {formatBytes(d.fileSize)}
                  </td>
                  <td className="p-4 text-right text-sm text-gray-500 whitespace-nowrap w-20">
                  {formatDistanceToNow(d.createdAt, { addSuffix: true })}
                  </td>
                  <td className="p-4 text-right w-4">
                    <UpdatePDF document={d} />
                  </td>
                  <td className="p-4 text-right w-4">
                    <DeletePDF document={d} />
                  </td>
                </tr>
              ))}

              {documents.length === 0 && (
                <tr>
                  <td className="p-4 italic">None</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Documents;
