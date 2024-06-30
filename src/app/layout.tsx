import type { Metadata } from "next";
import { Inter, Cookie } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import SessionWrapper from "@/components/SessionWrapper";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fileophile",
  description:
    "The easiest way to share files and create collaborative workspaces",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Playwrite+ES+Deco:wght@100..400&display=swap"
            rel="stylesheet"
          />
      </head>
      <body className={`${inter.className} `}>
        <SessionWrapper>
          {children}
          </SessionWrapper>
      </body>
    </html>
  );
}

