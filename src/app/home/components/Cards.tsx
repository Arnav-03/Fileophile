import Link from "next/link";
import React from "react";

interface CardsProps {
  title: string;
  description: string;
  navigate: string;
}

const Cards: React.FC<CardsProps> = ({ title, description,navigate }) => {
  return (
    <div className="max-w-sm p-6 md:p-10  m-4 md:m-8  rounded-2xl card cursor-pointer bg-white/10 backdrop-blur-sm border-none text-white hover:bg-white/15 transition-colors ">
      <h5 className="mb-2 text-2xl md:text-4xl font-bold tracking-tight">{title}</h5>
      <p className="mb-3 text-lg ">{description}</p>
      <Link
        href={navigate}
        className="inline-flex items-center px-3 py-2 text-sm md:text-lg bg-[#d10000] font-medium text-white rounded-md"
      >
        Jump In
        <svg
          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </Link>
    </div>
  );
};

export default Cards;
