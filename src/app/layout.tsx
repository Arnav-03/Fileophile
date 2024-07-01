import type { Metadata } from "next";
import { Inter, Cookie } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import Favicon from "../../public/favicon.ico";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Fileophile",
  description:
    "The easiest way to share files and create collaborative workspaces",
  icons: [{ rel: "icon", url: Favicon.src }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/api/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playwrite+ES+Deco:wght@100..400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lilita+One&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet"
        ></link>
      </head>
      <body className={`${inter.className} `}>
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}
