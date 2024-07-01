import React, { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/FirebaseConfig";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useFileContext } from "@/context/fileContext";

function Dropbox() {
  const db = getFirestore(app);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const { addFile } = useFileContext();
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    files.forEach((file) => {
      console.log(file);
      addFile(file);
    });
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    files.forEach((file) => {
      console.log(file);
      addFile(file);
    });
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  return (
    <div className="flex items-center flex-col justify-center m-3 lg:m-4 mb-0 h-fit">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-[400px] border-2 border-red-600 border-dashed rounded-lg cursor-pointer bg-[#f1f1f1]"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-10 h-10 lg:w-16 lg:h-16 mb-4 text-red-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-md lg:text-xl text-red-600">
            <span className="font-extrabold">Click to upload</span> or drag and drop
          </p>
        </div>
        <input
          onChange={handleFileChange}
          id="dropzone-file"
          type="file"
          className="hidden"
          multiple
        />
      </label>
      <div className="text-red-600 m-1 p-2 font-bold">{error}</div>
    </div>
  );
}

export default Dropbox;
