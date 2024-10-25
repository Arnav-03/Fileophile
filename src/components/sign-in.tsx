"use client"
import { useUserContext } from "@/context/userContext";
import { signIn, useSession,signOut as nextAuthSignOut } from "next-auth/react";
import { useEffect } from "react";
import { FormEvent } from "react";
import useSetUser from "./useSessionhook";
import { usePathname } from "next/navigation";

export function SignIn() {
  const pathname = usePathname()

 useSetUser();

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      
    } catch (error) {
      
    }
    await signIn("google");
    console.log("googlesign")
  };

  return (
    <>
       <form onSubmit={handleSignIn}>
          <button className="login-with-google-btn w-full" type="submit">Continue with Google</button>
        </form>
    </>
  );
}