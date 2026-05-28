import React from "react";
import Link from "next/link";
import SvgChevronLeft from "@/Icon/Chevron";

interface IBack {
  title: React.ReactNode;
  linkTo: string;
  desc?: string;
}

const LinkBack: React.FC<IBack> = ({ title, desc, linkTo }) => {
  return (
    <div className="w-auto flex gap-2 items-center">
      <Link
        href={linkTo}
        className="flex rounded-lg h-10 w-10 items-center text-gray-500"
      >
        <SvgChevronLeft height="50" />
      </Link>
      <div className="flex flex-col">
        <span className="text-gray-400 text-[10pt] font-light leading-none">
          {title}
        </span>
      </div>
    </div>
  );
};

export default LinkBack;
