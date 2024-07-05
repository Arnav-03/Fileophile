"use client";
import { useUserContext } from "@/context/userContext";
import axios from "axios";
import { signOut as nextAuthSignOut } from "next-auth/react"; // Import signOut from next-auth/react
import { useRouter } from "next/navigation";
import { Cookie } from "next/font/google";

const cookie = Cookie({
  subsets: ["latin"],
  weight: ["400"],
});
function Page() {
  const { setUser } = useUserContext();
  const router = useRouter();

  const logout = async () => {
    try {
      // Execute your custom logout endpoint
      await axios.post("/api/users/logout");

      // Set user to null in your context
      setUser(null);

      // Execute the NextAuth sign-out
      await nextAuthSignOut({ redirect: false });

      // Navigate to the login page
      router.push('/login');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // Trigger the logout process when the component is rendered
  logout();

  return (
    <p className={`${cookie.className} text-white bg-[#c5242a] text-5xl h-screen m-auto text-center flex items-center justify-center`}>
      Logging out...
    </p>
  );
}

export default Page;
