"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cards from "./components/Cards";
import { useUserContext } from "@/context/userContext";
import Loading from "../loading";
import { useSession } from "next-auth/react";
import { Cookie } from "next/font/google";
import Loadinghome from "./components/Loadinghome";
import AnimatedBackground from "@/components/AnimatedBackground";

const cookie = Cookie({
  subsets: ["latin"],
  weight: ["400"],
});
export default function Page() {
  const router = useRouter();
  const { user } = useUserContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <Loadinghome />
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center ch bg-gradient-to-r from-red-900 via-red-600 to-black">
        <AnimatedBackground/>
        <Cards
          title="Share Files"
          description="Easily distribute documents, images, and media by generating shareable links, facilitating efficient collaboration and seamless access for recipients."
          navigate="/sharefile"
        />
        <Cards
          title="Collaboration"
          description="A shared environment where multiple users can collectively manage and access files, promoting seamless collaboration, organization, and productivity."
          navigate="/collaboration"
        />

      </div>
    </div>
  );
}
