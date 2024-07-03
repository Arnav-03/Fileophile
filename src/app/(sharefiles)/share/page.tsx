"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useFileContext } from "@/context/fileContext";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "@/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import eyeopen from "../../../../public/eyeopen.png";
import eyeclosed from "../../../../public/eyeclosed.png";
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
import downloadd from "../../../../public/download.png";

import Link from "next/link";
import { Cookie } from "next/font/google";
import { useSearchParams } from "next/navigation";
import JSZip from "jszip";
import { saveAs } from "file-saver";

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
  const [password, setpassword] = useState<string>("");
  const [showfiles, setshowfiles] = useState<boolean>(false);

  useEffect(() => {
    const userParam = searchParams.get("user");
    const folderParam = searchParams.get("folder");
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
  const getpasswordFromFirestore = async () => {
    try {
      const fileid = `user=${user}&folder=${folder}`;
      const docRef = doc(db, "password-protected-links", fileid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setshowfiles(false);
        setpassword(docSnap.data().password);
        return docSnap;
      } else {
        console.log("No such passsword document!");
        setshowfiles(true);
      }
    } catch (error) {
      console.error("Error fetching password document:", error);
    }
  };

  const getDocumentsFromFirebase = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, "fileophile", user, folder)
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
      getpasswordFromFirestore();
      setTimeout(() => {
        getDocumentsFromFirebase();
      }, 1000);
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

  const downloadAllFilesAsZip = async () => {
    const zip = new JSZip();

    const filePromises = documents.map(async (doc) => {
      const response = await fetch(doc.fileUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${doc.fileName}`);
      }
      const blob = await response.blob();
      zip.file(doc.fileName, blob);
    });

    try {
      await Promise.all(filePromises);
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "files.zip");
    } catch (error) {
      console.error("Error creating zip file:", error);
    }
  };

  const [preview, setpreview] = useState(false);
  const [imageurl, setimageurl] = useState("");

  const previewFile = (url: string, name: string) => {
    const extension = name.split(".").pop()?.toLowerCase();

    if (
      extension === "jpg" ||
      extension === "jpeg" ||
      extension === "png" ||
      extension === "gif"
    ) {
      setpreview(true);
      setimageurl(url);
    } else {
      console.log(`Preview not supported for ${extension} files.`);
    }
  };
  const [showpassword, setshowpassword] = useState(false);
  const [passwordfromuser, setpasswordfromuser] = useState(" ");
  const togglePasswordVisibility = () => {
    setshowpassword(!showpassword);
  };

  const passworcheck=()=>{
    seterror("");
    if(passwordfromuser===" "){
      seterror("Enter Password to access the files!!!");
      return;
    }
    if(passwordfromuser!==password){
      seterror("Passwords dont match!!!");
    }else{
      setshowfiles(passwordfromuser===password);
    }
  }

  const [error, seterror] = useState("")
  return (
    <div className=" flex items-center justify-center flex-col">
      {showfiles && (
        <div className="flex items-center justify-center flex-col">
          <div className="text-lg font-bold ">
            You can download the files below {password}
            <div
              onClick={downloadAllFilesAsZip}
              className="flex items-center justify-center text-xs cursor-pointer m-2 hover:underline"
            >
              Click here to download all files
              <Image height={20} src={downloadd} alt="download" />
            </div>
          </div>
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
                      <Link
                        onClick={() => previewFile(doc.fileUrl, doc.fileName)}
                        target="blank"
                        href={doc.fileUrl}
                        download
                      >
                        <div className="bg-blue-500 ml-2 text-white text-sm p-1 rounded">
                          View File
                        </div>
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {!showfiles && (
        <div className="flex flex-col items-center justify-center">
          <div className="text-lg font-bold ">
            Files are password protected
          </div>
          <div className="text-black  flex  border-2 m-4 border-black p-2 rounded">
          <input
              className="  outline-none  overflow-hidden "
              onChange={(e) => setpasswordfromuser(e.target.value)}
              type={`${showpassword ? "text" : "password"}`}
              placeholder="password"
              name="password"
              id="password"
            />
            <Image
              className=""
              onClick={togglePasswordVisibility}
              src={showpassword ? eyeclosed : eyeopen}
              height={25}
              alt="Password visibility toggle"
            />
          </div>
          <div onClick={passworcheck} className="bg-blue-500  text-white p-2 rounded">
            Submit
          </div>
          <div className="text-red-600 text-center font-bold text-md">
            {error}
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
