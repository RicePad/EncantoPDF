"use client";

import { deleteDocument, updateDocument } from "@/actions/prisma";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Document } from "@prisma/client";

import { Loader2, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import SubmitButton from "../SubmitButton";

import { useTransition } from "react";
import { showToast } from "@/lib/utils";
import { deleteS3PDF } from "@/actions/s3";
import { deletePineconeNamespace } from "@/actions/pinecone";

interface Props {
  document: Document;
}

const DeletePDF = ({ document }: Props) => {
  const [open, setOpen] = useState(false);

  let [isPending, startTransition] = useTransition();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Trash2
          className="w-4 h-4 cursor-pointer"
          style={{ strokeWidth: "3" }}
        />
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-[425px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Delete document</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col mb-2">
          <span className="text-sm mb-4">
            Do you want to delete the following document?
          </span>
          <span className="text-sm font-semibold border-black border-l-2 px-2 whitespace-nowrap w-20">
            {document.fileName}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            type="submit"
            variant="orange"
            disabled={isPending}
            onClick={() =>
              startTransition(() => {
                try {
                  const fileKey = document.fileKey;
                  deleteS3PDF(fileKey);
                  deletePineconeNamespace(fileKey);
                  deleteDocument(document.id);

                  setOpen(false);
                } catch (error) {
                  console.log(error);
                  showToast("Could not complete the process");
                }
              })
            }
          >
            {isPending ? (
              <Loader2
                className="h-5 w-5 text-white/80 animate-spin"
                style={{ strokeWidth: "3" }}
              />
            ) : (
              `Delete`
            )}
          </Button>
          <DialogTrigger asChild>
            <Button variant="light">Cancel</Button>
          </DialogTrigger>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePDF;
