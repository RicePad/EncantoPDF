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
    const fileNameWithExtension = matches[1];

    const fileExtension = fileNameWithExtension.split(".").pop();

    if (fileExtension?.toLowerCase() === "pdf") {
      return fileNameWithExtension;
    }
  }

  return null;
}

export function showToast(message: string) {
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

export function scrollToBottom(messageEndRef: React.RefObject<HTMLElement>) {
  if (messageEndRef.current) {
    messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  }
}

export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "Kb", "Mb", "Gb"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
