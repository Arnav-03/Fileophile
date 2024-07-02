"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useFileContext } from "@/context/fileContext";
import { getFirestore } from "firebase/firestore";
import { app } from "@/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";

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
import doc1 from "../../../../public/doc.png";
import Link from "next/link";
import { Cookie } from "next/font/google";
import { useSearchParams } from "next/navigation";

const cookie = Cookie({
subsets: ["latin"],
weight: ["400"],
});
interface FileDocument {
fileName: string;
fileSize: number;
fileType: string;
fileUrl: string;
shortUrl: string;
}

function Page() {
    const searchParams = useSearchParams();
    const [user, setUser] = useState<string>("");
    const [folder, setFolder] = useState<string>("");

    useEffect(() => {
    const userParam = searchParams.get('user');
    const folderParam = searchParams.get('folder');

    if (userParam !== null) {
        setUser(userParam);
    }
    if (folderParam !== null) {
        setFolder(folderParam);
    }
    }, [searchParams]);
    

    

const { files, removeFile } = useFileContext();
const db = getFirestore(app);
const [documents, setDocuments] = useState<FileDocument[]>([]);

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
        return doc1;
    case "csv":
        return csv;
    default:
        return undefinedFIle;
    }
};

const getDocumentsFromFirebase = async () => {
    try {
    const querySnapshot = await getDocs(
        collection(
        db,
        "fileophile",
        user,
       folder
        )
    );
      let documentsData: FileDocument[] = [];
      querySnapshot.forEach((doc) => {
        // Type assertion to FileDocument
        const documentData = {
          fileName: doc.data().fileName,
          fileSize: doc.data().fileSize,
          fileType: doc.data().fileType,
          fileUrl: doc.data().fileUrl,
          shortUrl: doc.data().shortUrl,
        } as FileDocument;

        documentsData.push(documentData);
      });
      setDocuments(documentsData);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  useEffect(() => {
    if (user && folder) {
      getDocumentsFromFirebase();
    }
  }, [user, folder]);

  const formatFileSize = (bytes: number): string => {
    if (bytes >= 1024 * 1024) {
      return (bytes / (1024 * 1024)).toFixed(2) + " MB";
    } else {
      return (bytes / 1024).toFixed(2) + " KB";
    }
  };
  const fileTrim = (filename: string | any[]) => {
    const trimmedName =
      filename.length > 26 ? `${filename.slice(0, 26)}...` : filename;
    return trimmedName;
  };
  return (
    <div className=" flex items-center justify-center flex-col">
      <div className="text-2xl m-1">Files Shared</div>
      <div className="flex gap-2">
        {documents.length === 0 && (
          <div
            className={`${cookie.className} text-4xl flex  m-4 p-4 items-center justify-between`}
          >
            Loading...
          </div>
        )}
        {documents.length > 0 && (
          <ul className="flex flex-col h-fit max-h-[345px] overflow-scroll border-2  border-[#817a7a] rounded-lg ">
            {documents.map((doc) => (
              <li
                className="flex border-b-[1px] border-[#cac0c0] m-1 p-1 items-center justify-between"
                key={doc.fileName}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <Image
                      src={getFileIcon(doc.fileName)}
                      alt={doc.fileName}
                      height={40}
                    />
                  </div>
                  <div className="">
                    <div className="">{fileTrim(doc.fileName)}</div>
                    <div className="text-xs text-gray-500">
                      {formatFileSize(doc.fileSize)}
                    </div>
                  </div>
                </div>

                <div>
                  <Link target="blank" href={doc.fileUrl}>
                    <div className="bg-blue-500 ml-2 text-white text-sm p-1 rounded">
                      Open File
                    </div>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Page;
