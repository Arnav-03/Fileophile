import Image from "next/image";
import { Inter  , Cookie , Archivo_Black} from "next/font/google";

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
  <div className="flex flex-col mt-[67px]     ">
    
    <div className="wave h-[800px]  bg-[#c5242a] ">
    <div className={`${archivoblack.className} m-4  text-[#e2b5b5] uppercase text-3xl  text-center `}>
    The easiest way to share files and create collaborative workspaces
    </div>

    <div className="bg-[#e7dada] text-[#be1a1a] p-2 py-3 m-4 cursor-pointer  uppercase rounded font-bold text-lg  ">
      get started
    </div>
    </div>
   
  </div>
  );
}
