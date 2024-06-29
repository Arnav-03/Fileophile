"use client";
import Image from "next/image";
import menu from "../../public/menu.png";
import cross from "../../public/cross.png";

import { Cookie, Archivo_Black } from "next/font/google";
import { useState } from "react";

// Call and assign font loaders to a const at the module scope
const cookie = Cookie({
  subsets: ["latin"],
  weight: ["400"],
});

const linksbeforelogin = [
  { name: "Sign up", link: "/signup" },
  { name: "Login", link: "/login" },
];

const linksafterlogin = [
  { name: "Share Files", link: "/share" },
  { name: "Repository", link: "/repository" },
  { name: "Profile", link: "/profile" },
  { name: "Settings", link: "/settings" },
];
type LinkItem = {
  name: string;
  link: string;
};
type LinkListProps = {
  links: LinkItem[];
};
const LinkList: React.FC<LinkListProps> = ({ links }) => (
  <ul className="w-full text-center">
    {links.map((item, index) => (
      <li
        className="border-b-[1px] text-xl border-[#dfdddd] m-2 p-3 px-5 cursor-pointer"
        key={index}
      >
        {item.name}
      </li>
    ))}
  </ul>
);

function Navigation() {
  const [menuopen, setMenuopen] = useState(false);
  const [loggedIn, setloggedIn] = useState(false);

  return (
    <div className="flex fixed top-0 items-center justify-between p-2 w-full bg-white z-10 ">
      <div className={`${cookie.className} text-[#000000] text-5xl h-[50px] ml-2`}>
        Fileophile
      </div>
      <div className=" hidden md:flex">
        <ul className="flex text-xl mr-2 items-center">
          {loggedIn ? (
            <div className="flex gap-[30px]">
              {linksafterlogin.map((item, index) => (
                <li>{item.name}</li>
              ))}
            </div>
          ) : (
            <div className="flex gap-[30px]">
              <li className="text-[#c5242a] rounded-3xl p-2 border-[#c5242a] border-2 cursor-pointer">
                Sign up
              </li>
              <li className="bg-[#c5242a] rounded-md p-2 text-white px-4">
                Login
              </li>
            </div>
          )}
        </ul>
      </div>
      <div
        onClick={() => {
          setMenuopen((prev) => !prev);
        }}
        className="md:hidden  cursor-pointer mr-1"
      >
        <Image src={menuopen ? cross : menu} alt="menu" height="45" />
      </div>
      <div
        className={`${
          menuopen ? "" : "hidden"
        } md:hidden flex fixed top-[70px] right-[10px] p-1 bg-white rounded-xl h-fit flex-col `}
      >
        <div className="">
          {loggedIn ? (
            <LinkList links={linksafterlogin} />
          ) : (
            <LinkList links={linksbeforelogin} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
