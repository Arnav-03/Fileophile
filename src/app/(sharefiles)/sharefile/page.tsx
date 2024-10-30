"use client";
import React from "react";
import Dropbox from "../components/Dropbox";
import FilePreviews from "../components/FilePreviews";
import Upload from "../components/Upload";

function Page() {
  return (
    <div className="flex flex-col ch w-full items-center bg-gradient-to-r from-red-900 via-red-600 to-black">
      <div className="flex   flex-col-reverse lg:flex-row w-full items-center justify-center bg-gradient-to-r from-red-900 via-red-600 to-black ">
        <div className="w-full lg:w-1/3 flex items-center justify-center mb-8 lg:mb-0 ">
          <FilePreviews />
        </div>
        <div className="w-full lg:w-2/3 ">
          <Dropbox />
        </div>
      </div>
      <Upload/>

    </div>
  );
}

export default Page;
