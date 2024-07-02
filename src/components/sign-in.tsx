"use client";
import User from "@/app/api/models/userModel";
import { useUserContext } from "@/context/userContext";
import axios from "axios";
import {
  signIn,
  useSession,
  signOut as nextAuthSignOut,
} from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, FormEvent, useState } from "react";

export function SignIn() {
  const router = useRouter();
  const { setUser } = useUserContext();

  const { data: session, status } = useSession();
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);

  const senduser = async (user: any) => {
    try {
      console.log("senduser", user);
      const response = await axios.post("/api/users/signup", user);
      router.push(`/home`);
    } catch (error: any) {
      console.log("signup failed ", error);
    } finally {
    }
  };
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const user = {
        username: session.user.name ?? "",
        email: session.user.email ?? "",
        imageAvatar: session.user.image ?? "",
      };
      setUser(user);
      senduser(user);
    } else {
      /*       console.log("Not logged in");
       */
    }
  }, [session, status]);

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signIn("google");
  };

  const handleSignOut = async () => {
    await nextAuthSignOut();
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSignIn}>
          <button
            className="login-with-google-btn w-full outline-none"
            type="submit"
          >
            Sign in with Google
          </button>
        </form>
      </div>
    </div>
  );
}
