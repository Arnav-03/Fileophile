import useSetUser from "@/components/useSessionhook";
import { useUserContext } from "@/context/userContext";
import { useSession } from "next-auth/react";
import { Cookie } from "next/font/google";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
const cookie = Cookie({
  subsets: ["latin"],
  weight: ["400"],
});
function Loadinghome() {
    const router=useRouter();
    const {user}=useUserContext();
   
    useSetUser();

    
  return (
    <div>
      <p
        className={`${cookie.className} text-white bg-[#c5242a] text-5xl h-screen m-auto text-center flex items-center justify-center `}
      >
        Loading...
      </p>
    </div>
  );
}

export default Loadinghome;
