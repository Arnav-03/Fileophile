"use client"
import Navigation from "@/components/Navigation";
import { FileProvider } from "@/context/fileContext";
import { useUserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Layout({ children }) {
  const {user}= useUserContext();
  const router= useRouter();
  useEffect(() => {
    
    if(!user){  
      router.push('/login');
    }
  
  }, [user])
  
  return (
    <div className="h-screen">
      <Navigation />
      <main className="pt-[68px]"><FileProvider>
            {children}
          </FileProvider></main>
    </div>


  )
}