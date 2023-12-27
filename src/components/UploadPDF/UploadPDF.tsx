import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, UploadCloud, X } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

function UploadPDF() {


  return (
  <Dialog>
  <DialogTrigger asChild>
    <Button variant="orange">
      <Upload className="w-4 h-4 mr-2" style={{ strokeWidth: "3" }} />
      Upload
    </Button>
  </DialogTrigger>

  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Upload a document</DialogTitle>
    </DialogHeader>

    <form  className="space-y-6">
      <div className="bg-white rounded-xl">
        <div className="border-dashed border-2 rounded-md bg-gray-50 h-36 w-full">
          
            <div className="h-full flex justify-center items-center text-black/70">
              <span className="overflow-hidden whitespace-nowrap text-ellipsis text-sm max-w-[200px]">
               
              </span>
              <button
                className="ml-1 cursor-pointer"
               
              >
                <X className="w-4 h-4" />
              </button>
            </div>
        
            <div
              
              className="h-full flex flex-col justify-center items-center cursor-pointer"
            >
              <input name="file"  />
              <UploadCloud className="w-10 h-10 text-[#ff612f]" />
              <p className="mt-2 text-sm text-slate-400">
                Drag and drop a PDF file here or click
              </p>
            </div>
     
        </div>
      </div>

      <div className="flex items-center">
        <div className="flex-grow border-t border-gray-200"></div>
        <span className="flex-shrink mx-4 uppercase text-gray-600 text-xs">
          or
        </span>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="url">Import from URL</Label>
        <Input
          id="url"
          name="url"

          className="font-light"
          placeholder="https://cdn.openai.com/papers/gpt-4.pdf"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button type="submit" variant="orange">
          Upload
        </Button>
        <DialogTrigger asChild>
          <Button variant="light">Cancel</Button>
        </DialogTrigger>
      </div>
    </form>
  </DialogContent>
</Dialog>
  )
}

export default UploadPDF;
