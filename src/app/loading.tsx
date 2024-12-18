"use client"
import { useUserContext } from "@/context/userContext";
import { Cookie } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const cookie = Cookie({
  subsets: ["latin"],
  weight: ["400"],
});


export default function Loading() {

  return <p className={`${cookie.className} bg-gradient-to-r from-red-900 via-red-600 to-black text-5xl h-screen m-auto text-center flex items-center justify-center  text-white`}>Loading...</p>
}