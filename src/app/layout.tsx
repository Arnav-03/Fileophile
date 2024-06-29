import type { Metadata } from "next";
import { Inter  , Cookie } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fileophile",
  description: "The easiest way to share files and create collaborative workspaces",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} `}>
        <Navigation/>
        {children}</body>
    </html>
  );
}
