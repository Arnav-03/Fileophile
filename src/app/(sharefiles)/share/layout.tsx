"use client";
import React, { ReactNode, useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import { FileProvider } from "@/context/fileContext";
import { useUserContext } from "@/context/userContext";
import Image from "next/image";
import copy from "../../../../public/copy.png";
import { useSearchParams } from "next/navigation";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const searchParams = useSearchParams();
  const [useremail, setUser] = useState<string>("");
  const [folder, setFolder] = useState<string>("");

  useEffect(() => {
    const userParam = searchParams.get("user");
    const folderParam = searchParams.get("folder");
    const passwordparam = searchParams.get("password");
    if (userParam !== null) {
      setUser(userParam);

    }
    if (folderParam !== null) {
      setFolder(folderParam);

    }
    
  }, [searchParams]);
  return (
    <div className="h-fit">
      <Navigation />
      <main className="mt-[66px] flex-col ch flex items-center ch ">
        <div className="zeyada text-5xl m-4 mt-10 mb-0 text-center ">Files Shared with You</div>
       <div className="m-4 mb-2">From: <span className="comfortaa"> {useremail}</span></div>
        <div className="flex items-center gap-2 w-full h-full justify-center">
          <div className=" h-full  ">
            <FileProvider>
            {children}
              </FileProvider></div>
        </div>
      </main>
    </div>
  );
}
