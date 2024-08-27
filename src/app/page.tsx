import Image from "next/image";
import { Inter, Cookie, Archivo_Black } from "next/font/google";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { SignIn } from "@/components/sign-in";

const cookie = Cookie({
  subsets: ["latin"],
  weight: ["400"],
});
const archivoblack = Archivo_Black({
  subsets: ["latin"],
  weight: ["400"],
});
export default function Home() {
  return (
    <div className="">
      <Navigation />
      <div className="flex flex-col mt-[50px]   h  bg-gradient-to-r from-red-600 to-pink-600 text-white ">
        <div className=" flex flex-col p-4  mt-20 items-center h-2/3">
          <div
            className={`${archivoblack.className} m-2   text-[#ffffff] uppercase text-3xl  md:text-5xl md:w-2/3 text-center `}
          >
            The easiest <br></br>way to <br></br> 
            <span className={`${cookie.className} glow capitalize  text-[#ffffff]  text-7xl  md:text-9xl md:w-2/3 text-left `}>share files</span> 
            <br></br>and create 
            <span className="text-white ">collaborative <br></br>workspaces</span> 
          </div>
    
          <Link href="/login">
            <div className="bg-[#ffffff]  text-[#d10000] p-2 py-3 m-4 cursor-pointer uppercase rounded font-bold text-lg">
              get started
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
