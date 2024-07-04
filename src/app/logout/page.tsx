"use client"
import { useUserContext } from "@/context/userContext";
import axios from "axios";
import { Cookie } from "next/font/google";
import { useRouter } from "next/navigation";
import router from "next/navigation";

const cookie = Cookie({
  subsets: ["latin"],
  weight: ["400"],
});

function page() {
  const { setUser } = useUserContext();
const router= useRouter();
  setUser(null);

  const logout = async () => {
    try {
      const response = await axios.post("/api/users/logout");
/*       console.log("logout successful", response.data);
 */      router.push('/login');
    } catch (error: any) {
      console.log("signup failed ", error);
    }
  };

  logout();

  return (
    <p
      className={`${cookie.className} text-white bg-[#c5242a] text-5xl h-screen m-auto text-center flex items-center justify-center `}
    >
      Logging out...
    </p>
  );
}

export default page;
