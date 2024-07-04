"use client";
import {
  signIn,
  useSession,
  signOut as nextAuthSignOut,
} from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, FormEvent, useState } from "react";
import Cards from "./components/Cards";
import { useUserContext } from "@/context/userContext";
import Loading from "../loading";
export default function page() {
  const router = useRouter();
  const {user} =useUserContext();

  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  const { data: session, status } = useSession();
  if (loading) {
    return <div><Loading/></div>;
  }
  return (
    <div>
      <div className="flex flex-wrap items-center justify-center ch">
      <Cards title="Share Files" description=" Easily distribute documents, images, and media by generating shareable links, facilitating efficient collaboration and seamless access for recipients." navigate="/sharefile"/>
      <Cards title="Collaboration" description="A shared environment where multiple users can collectively manage and access files, promoting seamless collaboration, organization, and productivity." navigate="/collaboration"/>
      </div>
    </div>
  );
}
