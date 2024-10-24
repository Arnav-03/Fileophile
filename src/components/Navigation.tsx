"use client";

import * as React from "react";
import { Cookie } from "next/font/google";
import { useRouter } from "next/navigation";
import { signIn, useSession, signOut as nextAuthSignOut } from "next-auth/react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, House, Info, CircleDollarSign, Share2, LogOut } from "lucide-react";

const cookie = Cookie({
  subsets: ["latin"],
  weight: ["400"],
});

const linksbeforelogin = [
  { name: "Home", link: "/", icon: House },
  { name: "About", link: "/about", icon: Info },
  { name: "Pricing", link: "/pricing", icon: CircleDollarSign },
];

const linksafterlogin = [
  { name: "Share Files", link: "/sharefile", icon: Share2 },
  { name: "logout", link: "/logout", icon: LogOut },
];

type LinkItem = {
  name: string;
  link: string;
  icon: React.ElementType;
};

export default function Navigation() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = React.useState(false);

  const NavigationList = ({ links }: { links: LinkItem[] }) => (
    <div className="flex items-center gap-4 capitalize">
      {links.map((item) => (
        <Button
          key={item.name}
          variant="ghost"
          className="text-white  hover:text-white hover:bg-white/20 text-lg flex items-center gap-3 h-12 px-4"
          onClick={() => router.push(item.link)}
        >
          {item.icon && <item.icon className="h-10 w-10" />}
          {item.name}
        </Button>
      ))}
    </div>
  );

  const MobileNavigationList = ({ links }: { links: LinkItem[] }) => (
    <div className="flex flex-col gap-2">
      {links.map((item) => (
        <Button
          key={item.name}
          variant="ghost"
          className="w-full justify-start gap-3 h-12 px-4"
          onClick={() => router.push(item.link)}
        >
          {item.icon && <item.icon className="h-7 w-7" />}
          {item.name}
        </Button>
      ))}
    </div>
  );

  return (
    <div className="fixed top-0 w-full z-50 bg-gradient-to-r from-red-900 via-red-600 to-black px-6">
      <div className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <div
          className={`${cookie.className} text-5xl text-white cursor-pointer`}
          onClick={() => router.push("/")}
        >
          Fileophile
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex">
          <NavigationList links={loggedIn ? linksafterlogin : linksbeforelogin} />
        </div>
        
        <Button className="bg-gradient-to-r from-red-900 via-red-600 to-red-900 px-4 py-2 text-white rounded-md h-12">
          Get Started
        </Button>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white">
              <Menu className="h-7 w-7" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="mt-4">
              <MobileNavigationList
                links={loggedIn ? linksafterlogin : linksbeforelogin}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}