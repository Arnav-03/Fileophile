"use client"
import Navigation from "@/components/Navigation";
import { FileProvider } from "@/context/fileContext";
export default function Layout({ children }) {
  return (
    <div className="h-screen">
      <Navigation />
      <main className="pt-[68px]"><FileProvider>
            {children}
          </FileProvider></main>
    </div>


  )
}