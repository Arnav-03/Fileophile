import Navigation from "@/components/Navigation";

 
export default function Layout({ children }) {
  return (
    <div className="h-screen">
  <Navigation/>
      <main className="pt-[68px]">{children}</main>
    </div>
  

  )
}