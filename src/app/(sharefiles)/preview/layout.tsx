"use client";
import React, { ReactNode } from "react";
import Navigation from "@/components/Navigation";
import { FileProvider } from "@/context/fileContext";
import { useUserContext } from "@/context/userContext";
import Image from "next/image";
import copy from "../../../../public/copy.png";
interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user } = useUserContext();

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
          <Image className="cursor-pointer" src={copy} height={20} alt="copy" />
        </div>
        <div className="min-h-10   flex md:items-center  md:justify-center  comfortaa border-[2px] border-[#524f4f] p-2 overflow-y-hidden md:p-1 md:pt-4    w-screen md:w-fit rounded-xl text-[10px] overflow-scroll md:text-[13px] ">
          http://fileophile.onrender.com/s/arnavarora0003gmail/arnavarora0003gmail_1_1719943748508
  
        </div>
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
