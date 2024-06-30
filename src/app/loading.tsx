import { Cookie } from "next/font/google";

const cookie = Cookie({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Loading() {
  return <p className={`${cookie.className} text-white bg-[#c5242a] text-5xl h-screen m-auto text-center flex items-center justify-center `}>Loading...</p>
}