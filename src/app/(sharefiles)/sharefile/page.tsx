"use client";
import React from "react";
import Dropbox from "../components/Dropbox";
import FilePreviews from "../components/FilePreviews";
import Upload from "../components/Upload";

function Page() {
  return (
    <div className="flex flex-col ch w-full items-center">
      <div className="flex   flex-col-reverse lg:flex-row w-full items-center justify-center">
        <div className="w-full lg:w-1/3">
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
