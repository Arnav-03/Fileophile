import React from "react";
import { useFileContext } from "@/context/fileContext";
import deletefile from "../../../../public/delete.png";
import Image from "next/image";
import doc from "../../../../public/doc.png";
import photo from "../../../../public/photo.png";
import music from "../../../../public/music1.png";
import pdf from "../../../../public/pdf.png";
import movie from "../../../../public/movie.png";
import apk from "../../../../public/apk.png";
import ppt from "../../../../public/ppt.png";
import txt from "../../../../public/txt.png";
import undefinedFIle from "../../../../public/undefinedFIle.png";
import xlsx from "../../../../public/xlsx.png";
import csv from "../../../../public/csv.png";

function FilePreviews() {
  const { files, removeFile } = useFileContext();

  const getFileIcon = (filename: string) => {
    const extension = filename.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return photo;
      case "mp3":
      case "wav":
      case "m4a":
        return music;
      case "pdf":
        return pdf;
      case "mp4":
      case "mkv":
        return movie;
      case "apk":
        return apk;
      case "ppt":
      case "pptx":
        return ppt;
      case "txt":
        return txt;
      case "xlsx":
      case "xls":
        return xlsx;
      case "doc":
      case "docx":
        return doc;
      case "csv":
        return csv;
      default:
        return undefinedFIle;
    }
  };

  function handleRemoveFile(id: string): void {
    removeFile(id);
  }
  

  return (
    <div
      className={`border-4 rounded-xl border-[#c9bcbc] h-[370px] m-2 flex items-center flex-col`}
    >
      <div className="text-3xl border-b-4 border-[#c9bcbc] text-center josefin uppercase tracking-[10px] p-2 w-full">
        Files
      </div>
      {files.length > 0 && (
        <ul className="w-full overflow-scroll overflow-x-hidden">
          {files.map(({ id, file }) => {
            const trimmedName =
              file.name.length > 26
                ? `${file.name.slice(0, 26)}...`
                : file.name;
            return (
              <li
                key={id}
                className="flex items-center justify-between border-b-2 border-[#e9e6e6] w-full text-lg mt-2 py-1"
              > 
              <div className="flex items-center gap-2">
              <Image
                  className="ml-2"
                  height={50}
                  src={getFileIcon(file.name)}
                  alt="icon"
                />
                <div className=""> {trimmedName}</div>
              </div>
              
                <div
                  onClick={() => handleRemoveFile(id)}
                  className=" cursor-pointer"
                >
                  <Image height={40} src={deletefile} alt="delete" />
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <div className="flex flex-col p-2 m-2">
        {files.length === 0 && (
          <div className="text-4xl mt-[50px] text-center lil text-[#db2525] h-full">
            You haven't added <br /> any files yet.
          </div>
        )}
      </div>
    </div>
  );
}

export default FilePreviews;
