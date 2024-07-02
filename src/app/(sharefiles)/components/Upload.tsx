import { useFileContext } from "@/context/fileContext";
import React, { useEffect, useRef, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { app } from "@/FirebaseConfig";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/userContext";

export default function Upload() {
  const { files } = useFileContext();
  const { user } = useUserContext();
  const storage = getStorage(app);
  const db = getFirestore(app);
  const [progress, setProgress] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [docidstore, setDocidstore] = useState<string | null>(null);
  const [showupload, setshowupload] = useState<boolean>(true);
  const [clickedupload, setclickupload] = useState<boolean>(false);
  const router = useRouter();
  const uploadTasksRef = useRef<any[]>([]); 
  const [userlink, setuserlink] = useState<string | null>(null);
  const [folderlink, setfolderlink] = useState<string>("");
  const [uploadfinished, setuploadfinished] = useState<boolean>(true);

  useEffect(() => {
    if (user?.email) {
      const namelink =
        user.email.split("@")[0] +
        (user.email.split("@")[1]?.split(".")[0] ?? "not found");
      setuserlink(namelink);
    } else {
      setuserlink("");
    }
  }, [user]);
  

  const uploadFiles = () => {
    if (userlink?.length === 0) {
      console.log("Login first");
      return;
    }
    if (files.length === 0) {
      console.log("Choose files first");
      return;
    }
  
    setclickupload(true);
    setshowupload(false);
    if (files.length > 5) {
      console.log("Too many files");
      return;
    }
  
    // Generate folder link based on userlink, files length, and timestamp
    const folderlink = `${userlink}_${files.length}_${Date.now()}`;
    setfolderlink(folderlink)
  
    const initialProgress = new Array(files.length).fill(0);
    setProgress(initialProgress);
  
    files.forEach((item, index) => {
      const metadata = {
        contentType: item.file.type,
      };
      const storageRef = ref(
        storage,
        `Fileophile/${userlink}/` + item.file?.name
      );
      const uploadTask = uploadBytesResumable(storageRef, item.file, metadata);
      uploadTasksRef.current.push({ uploadTask, storageRef });
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const fileProgress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  
          setProgress((prevProgress) => {
            const newProgress = [...prevProgress];
            newProgress[index] = fileProgress;
            return newProgress;
          });
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              console.error(
                "User doesn't have permission to access the object"
              );
              break;
            case "storage/canceled":
              console.error("User canceled the upload");
              break;
            case "storage/unknown":
              console.error(
                "Unknown error occurred, inspect error.serverResponse"
              );
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            if (userlink) {
              if (folderlink.length > 0) {
                saveInfo(userlink, item.file, downloadURL, folderlink);
              } else {
                console.log("Folder link is empty");
              }
            } else {
              console.error("Userlink is null");
              stopUploads();
            }
          });
        }
      );
    });
  };
  

  const saveInfo = async (name: string, file: File, fileUrl: string , folderlink: string) => {
    const docId = Date.now().toString();
    setDocidstore(docId);
    await setDoc(doc(db, `fileophile/${name}/${folderlink}`, docId), {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      fileUrl: fileUrl,
      shortUrl: process.env.NEXT_PUBLIC_BASE_URL + name + docId,
    }).then((resp) => {
/*       console.log("doc saved");
 */    });
  };


  const stopUploads = () => {
    setshowupload(true);
    uploadTasksRef.current.forEach(({ uploadTask, storageRef }) => {
      uploadTask.cancel();
      deleteObject(storageRef)
        .then(() => {
          console.log("File deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting file:", error);
        });
    });
    setProgress([]);
    uploadTasksRef.current = [];
  };

  const overallProgress =
    progress.length > 0
      ? progress.reduce((sum, current) => sum + current, 0) / progress.length
      : 0;

      useEffect(() => {
        if (overallProgress === 100) {
          console.log(folderlink)

          setTimeout(() => {
            router.push(`/preview/${user?.email}/${folderlink}`);
          }, 3000);
        }
      }, [overallProgress]);

  return (
  
    <div className="flex flex-col items-center w-full p-4 text-[#ffffff] relative">
      <div
        onClick={uploadFiles}
        className={` bg-[#bb0b14] p-3 rounded cursor-pointer mb-4 z-10 ${
          showupload ? "" : "hidden"
        }`}
      >
        Upload
      </div>

      <div
        className={`w-full ${
          clickedupload ? "h-screen fixed top-0 left-0" : ""
        } flex flex-col items-center justify-center px-8 ${
          progress.length > 0 ? "bg-black bg-opacity-90" : ""
        }`}
      >
        {progress.length > 0 && (
          <>
            <div className="w-full max-w-lg bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 ">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>
            <div className="text-white mt-2">{`Progress: ${overallProgress.toFixed(
              2
            )}%`}</div>
          </>
        )}
        <div className={`mt-4 text-[#a09a9a] ${showupload ? "hidden" : ""}`}>
          Please don't refresh your browser while uploading
        </div>
        <div
          onClick={stopUploads}
          className={` bg-[#a5080f] p-2 px-4 m-4 rounded cursor-pointer mb-4 z-10 ${
            showupload ? "hidden" : ""
          }`}
        >
          Stop
        </div>
      </div>
    </div>
  );
}
