"use client";


import Decoration from '@/components/Decoration'
import BigCountNumber from '../BigCountNumber';
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
import {Loader2, Upload, UploadCloud, X } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { generatePreSignedURL } from '@/actions/s3';
import { getPDFFileNameFromURL, showToast } from '@/lib/utils';
import { embedPDFToPinecone } from '@/actions/pinecone';

const UploadPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string>("");
  const [isButtonEnbaled, setIsButtonEnabled] = useState(false);
  const [count, setCount] = useState(0);


  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // console.log('onDrop render');
    // Do something with the files
    const pdfFile = acceptedFiles[0];

    if (!pdfFile) {
      //alert("Please upload only PDF file.");
      showToast("Please upload only PDF file.");
      return;
    }

    if (pdfFile.size > 10 * 1024 * 1024) {
      // bigger than 10Mb
     // alert("Max file size: 10Mb");
     showToast("Max file size: 10Mb.");
     return;
    }

    // console.log(pdfFsile);
    setFile(pdfFile);
    setUrl("");
    setIsButtonEnabled(true);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
    onDrop,
  });




  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    setFile(null);
    setIsButtonEnabled(e.target.value !== "");
  };

  const handleRemoveFile = () => {
    setFile(null);
    setIsButtonEnabled(false);
  };

  const resetForm = () => {
    setFile(null);
    setUrl("");
    setIsButtonEnabled(false);
  };

  const handleOpenDialog = () => {
    setOpen(!open);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    try {
      setIsLoading(true);
      // Handle form submission here.
      if (file) {
        //generate pre-signed url from S3 using server actions

        console.log('File uploaded:', file);
        const { putUrl, fileKey } = await generatePreSignedURL(file.name, file.type);
        // Handle file upload
        console.log("presigned URL: ", putUrl);
        console.log("File key: ", fileKey);


         // Step #2: Upload PDF file from client browser to S3
         await uploadPDFToS3(file, putUrl);

         // Step #3: Extract PDF file's content and save it to Pinecone vector database
         const embedPDF = await embedPDFToPinecone(fileKey);
          // console.log('Client Embed PDF', embedPDF);

        
      } else if (url) {
        console.log('inside url block', url);

        // Handle URL input
        const proxyUrl = `https://corsproxy.io/?${url}`;
        const response = await fetch(proxyUrl);

      
        
        console.log('response: ', response);

        const fileName =  getPDFFileNameFromURL(url);
        const fileSize = Number(response.headers.get("Content-Length"));
        const fileType = response.headers.get("Content-Type");

        console.log('fileName', fileName);

        console.log('fileSize', fileSize);
        console.log('fileType', fileType);

        if(!fileName || fileType !== "application/pdf"){
          throw new Error("Incorrect File Format");
        }

        const { putUrl, fileKey } = await generatePreSignedURL(fileName, fileType);
        console.log("Pre-signed URL: ", putUrl);
        console.log("File Key: ", fileKey);

        const blob = await response.blob();
        await uploadPDFToS3(blob, putUrl);

        // Step #3: Extract PDF file's content and save it to Pinecone vector database
        const embedPDF = await embedPDFToPinecone(fileKey);
        // console.log('Client Embed PDF', embedPDF);

      }
    } catch (error: any) {
      //alert(error);
      showToast(error.message)

    } finally {
      setIsLoading(false);
      resetForm()
    }


  };


  const uploadPDFToS3 = async (file: File | Blob, putUrl: string) => {
    const uploadResponse = await fetch(putUrl,
      {
        body: file,
        method: "PUT",
        headers: {
          "Content-Type": "application/pdf",
        },
      }
    )

    console.log('UPLOAD RESPONSE: ', uploadResponse);
  }


  return (
    <Dialog open={open} onOpenChange={handleOpenDialog}>
      {/* <Decoration/>
      <BigCountNumber count={count} /> */}
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-xl">
            <div className="border-dashed border-2 rounded-md bg-gray-50 h-36 w-full">
              {file ? (
                <div className="h-full flex justify-center items-center text-black/70">
                  <span className="overflow-hidden whitespace-nowrap text-ellipsis text-sm max-w-[200px]">
                    {file?.name}
                  </span>
                  <button
                    className="ml-1 cursor-pointer"
                    onClick={handleRemoveFile}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div
                  {...getRootProps()}
                  className="h-full flex flex-col justify-center items-center cursor-pointer"
                >
                  <input name="file" {...getInputProps()} />
                  <UploadCloud className="w-10 h-10 text-[#ff612f]" />
                  <p className="mt-2 text-sm text-slate-400">
                    Drag and drop a PDF file here or click
                  </p>
                </div>
              )}
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
              value={url}
              onChange={handleUrlChange}
              className="font-light"
              placeholder="https://cdn.openai.com/papers/gpt-4.pdf"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              type="submit"
              variant="orange"
              disabled={!isButtonEnbaled || isLoading}
            >
              {isLoading ? (
                <Loader2
                  className="h-5 w-5 text-white/80 animate-spin"
                  style={{ strokeWidth: "3" }}
                />
              ) : (
                `Upload`
              )}
            </Button>
            <DialogTrigger asChild>
              <Button variant="light">Cancel</Button>
            </DialogTrigger>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadPDF;
