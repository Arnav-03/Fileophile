"use client";
import React, { ReactNode, useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import { FileProvider } from "@/context/fileContext";
import { useUserContext } from "@/context/userContext";
import Image from "next/image";
import copy from "../../../../public/copy.png";
import tick from "../../../../public/tick2.png";

import { useSearchParams } from "next/navigation";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const searchParams = useSearchParams();
  const [useremail, setUser] = useState<string>("");
  const [folder, setFolder] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [showfiles, setShowfiles] = useState(false);
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

  const baselink = process.env.NEXT_PUBLIC_BASE_URL;
  const link = `${baselink}share?user=${useremail}&folder=${folder}`;
  return (
    <div className="h-fit">
      <Navigation />
      <main className="mt-[66px] flex-col ch flex items-center ch ">
        <div className="zeyada text-5xl m-4 mb-0  ">File Preview</div>
        <div className="mb-2 text-sm md:text-lg font-semibold">
          Now you can copy the link below to share your files
        </div>
        <div className="flex items-center gap-2">
          Copy link
          <Image
            onClick={() => {
              navigator.clipboard.writeText(link);
            }}
            className="cursor-pointer"
            src={copy}
            height={20}
            alt="copy"
          />
          
        </div>
        <div className="min-h-10   flex md:items-center  md:justify-center  comfortaa border-[2px] border-[#524f4f] p-2 overflow-y-hidden md:p-1 md:pt-4    w-screen md:w-fit rounded-xl text-[10px] overflow-scroll md:text-[13px] ">
          {link}
        </div>
        <div className="flex items-center gap-2 w-full h-full justify-center">
          <div className=" h-full  ">
            <FileProvider>{children}</FileProvider>
          </div>
        </div>
      </main>
    </div>
  );
}
