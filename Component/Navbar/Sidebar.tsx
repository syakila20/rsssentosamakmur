import React from "react";
import Image from "next/image";
const Sidebar = () => {
  return (
    <div
      className="absolute flex flex-col justify-between  text-sm uppercase tracking-wider h-screen w-[55]
        bg-white/10 backdrop-blur-md z-25
        "
    >
      <div className="flex flex-col items-center gap-1.5 mt-5"></div>
      <div className="flex flex-col items-center gap-5">
        <span className="[writing-mode:vertical-rl] rotate-180 tracking-widest text-[12px] font-semibold">
          RS SENTOSA MAKMUR
        </span>
        <div className="border h-9" />
        <Image
          src="/fb.png"
          alt={"image"}
          height={22}
          width={22}
          className="object-cover"
        />
        <Image
          src="/instagram.png"
          alt={"image"}
          height={21}
          width={21}
          className="object-cover"
        />
        <span className="text-[10px] h-7.5">2026</span>
      </div>
    </div>
  );
};

export default Sidebar;
