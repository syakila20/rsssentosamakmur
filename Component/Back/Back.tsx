import React from "react";
import Link from "next/link";
import SvgChevronLeft from "@/Icon/Chevron";

interface IBack {
  title: string;
  linkTo: string;
  desc: string;
}

const Back: React.FC<IBack> = ({ title, desc, linkTo }) => {
  return (
    <div className="w-50 flex gap-2 items-center">
      <Link
        href={linkTo}
        className="bg-blue-800 flex rounded-lg h-10 w-10 px-2 items-center text-white"
      >
        <SvgChevronLeft height="40" />
      </Link>
      <div className="flex flex-col">
        <span className="text-gray-400 text-[10pt] font-light leading-none">
          {title}
        </span>
        <span className="text-gray-700 text-[14pt] font-normal leading-none mt-1.5">
          {desc}
        </span>
      </div>
    </div>
  );
};

export default Back;
