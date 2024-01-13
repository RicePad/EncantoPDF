import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "react-toastify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPDFFileNameFromURL(url: string) {
  // Use a regular expression to etract the file name from the URL
  const matches = url.match(/\/([^/?#]+)[^/]*$/);

  if (matches && matches.length > 1) {
    //console.log('matches: ', matches);
    const fileNameWithExtension = matches[1];
    //console.log('fileNameWithExtension: ', fileNameWithExtension);

    const fileExtension = fileNameWithExtension.split(".").pop();
    //console.log('filExtension: ', fileExtensison);

    if (fileExtension?.toLowerCase() === "pdf") {
      console.log("getPDFFileNameFromUrl:", fileExtension);
      return fileNameWithExtension;
    }
  }

  return null;
}

export function showToast(message: string) {
  console.log("react tostify");
  toast(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
}
