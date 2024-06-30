"use client";
import {
  signIn,
  useSession,
  signOut as nextAuthSignOut,
} from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, FormEvent, useState } from "react";
import Cards from "./components/Cards";

export default function page() {
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
      console.log("Dashboad", session.user);
  
    } else {
      console.log("Not logged in");
    }
  }, [session, status]);

 

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center ch">
      <Cards title="Share Files" description=" Easily distribute documents, images, and media by generating shareable links, facilitating efficient collaboration and seamless access for recipients." navigate="/sharelink"/>
      <Cards title="Collaboration" description="A shared environment where multiple users can collectively manage and access files, promoting seamless collaboration, organization, and productivity." navigate="/collaboration"/>
      </div>
    </div>
  );
}
