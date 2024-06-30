"use client";
import Image from "next/image";
import menu from "../../public/menuw.png";
import cross from "../../public/crossw.png";

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
  { name: "Collaboration", link: "/Collaboration" },
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
        className="border-b-[1px] text-xl text-black border-[#dfdddd] m-2 p-3 px-5 cursor-pointer"
        key={index}
      >
        {item.name}
      </li>
    ))}
  </ul>
);

function Navigation() {
  const [menuopen, setMenuopen] = useState(false);
  const [loggedIn, setloggedIn] = useState(true);

  return (
    <div className="flex fixed top-0 items-center justify-between p-2 w-full bg-[#d10000] text-white z-10 ">
      <div className={`${cookie.className}  text-5xl h-[50px] ml-2`}>
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
            <div className="flex cursor-pointer gap-[30px]">
             {linksbeforelogin.map((item, index) => (
                <li>{item.name}</li>
              ))}
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
