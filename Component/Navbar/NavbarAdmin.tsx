"use client";

import SvgMenu from "@/Icon/Menu";
import { useSidebar } from "../Sidebar/SidebarContext";
import { useEffect, useRef, useState } from "react";

import SafeImage from "../SafeImage/SafeImage";

import { Breadcrumb } from "../Breadcrumb/Breadcrumb";

interface INavbarAdmin {
  name: string;
  email: string;
  avatar: string;
}

const NavbarAdmin: React.FC<INavbarAdmin> = (props) => {
  const { collapsed, toggle } = useSidebar();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      className="
        h-14
        flex items-center justify-between
        px-4
        bg-[#F8F8F8] border-b
        sticky top-0
        z-30
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          className="
            p-2 rounded hover:bg-gray-100
            transition
          "
        >
          <SvgMenu />
        </button>

        <div className="flex items-center gap-2 text-sm">
          <Breadcrumb />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="
    flex items-center gap-3
    rounded-xl
    px-3 py-2
    hover:bg-slate-50
    transition-colors
  "
          >
            <div className="relative h-9 w-9 overflow-hidden rounded-full">
              <SafeImage
                src={props.avatar || ""}
                alt={props.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="hidden text-left md:block">
              <p className="text-sm font-medium text-slate-800">{props.name}</p>
              <p className="text-xs text-slate-500">Administrator</p>
            </div>
          </button>

          {open && (
            <div
              className="
      absolute right-0 top-full mt-2
      w-64
      rounded-2xl
      border border-slate-200
      bg-white
      shadow-lg
      overflow-hidden
    "
            >
              <div className="px-4 py-4">
                <p className="font-semibold text-slate-800">{props.name}</p>
                <p className="text-sm text-slate-500">{props.email}</p>
              </div>

              <div className="border-t border-slate-100 py-2">
                <button
                  className="
          w-full text-left
          px-4 py-2.5
          text-sm text-slate-700
          hover:bg-slate-50
        "
                >
                  Profil Saya
                </button>

                <button
                  className="
          w-full text-left
          px-4 py-2.5
          text-sm text-slate-700
          hover:bg-slate-50
        "
                >
                  Ubah Data
                </button>
              </div>

              <div className="border-t border-slate-100 py-2">
                <button
                  className="
          w-full text-left
          px-4 py-2.5
          text-sm text-red-600
          hover:bg-red-50
        "
                >
                  Keluar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavbarAdmin;
// "use client";

// import SvgChevronLeft from "@/Icon/Chevron";
// import SvgUsers from "@/Icon/User";
// import { useState, useRef, useEffect } from "react";

// export default function Navbar() {
//
//   return (
//     <nav className="sticky top-0 z-50 border-b bg-white">
//       <div className="flex h-16 items-center justify-between px-6">
//         {/* Logo */}
//         <div>
//           <h1 className="text-xl font-bold text-slate-800">Admin Panel</h1>
//         </div>

//         {/* Right Section */}

//       </div>
//     </nav>
//   );
// }
