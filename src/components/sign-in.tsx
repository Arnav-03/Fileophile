"use client";
import {
  signIn,
  useSession,
  signOut as nextAuthSignOut,
} from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, FormEvent, useState } from "react";

export function SignIn() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setName(session.user.name || null);
      setEmail(session.user.email || null);
      setUserAvatar(session.user.image || null);
      console.log("User signed in:", session.user);
    if (session.user.name) {
        router.push(`/dashboard?name=${encodeURIComponent(session.user.name)}`);
      } 
            router.push(`/dashboard`);
    } else {
      console.log("Not logged in");
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
