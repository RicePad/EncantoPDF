import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getPDFFileNameFromURL (url: string){
// Use a regular expression to etract the file name from the URL
const matches = url.match(/\/([^/?#]+)[^/]*$/);

if(matches && matches.length > 1) {
  //console.log('matches: ', matches);
  const fileNameWithExtension = matches[1];
  //console.log('fileNameWithExtension: ', fileNameWithExtension);

  const fileExtension = fileNameWithExtension.split(".").pop();
  //console.log('filExtension: ', fileExtensison);

  if(fileExtension?.toLowerCase() === 'pdf') {
    return fileNameWithExtension;
  }

}

return null;
}