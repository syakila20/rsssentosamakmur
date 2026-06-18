"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useSidebar } from "./SidebarContext";
import { ISidebarMenu } from "./menu";
import SvgArrow from "@/Icon/Arrow";
import SvgChevronLeft from "@/Icon/Chevron";
import SvgArrowDown from "@/Icon/ArrowDown";

interface Props {
  item: ISidebarMenu;
}

export default function SidebarItem({ item }: Props) {
  const pathname = usePathname();
  const { collapsed } = useSidebar();
  const [hovered, setHovered] = useState(false);
  const Icon = item.icon;
  const hasChildren = !!item.children?.length;

  // =============================
  // ✅ FIXED ACTIVE LOGIC (IMPORTANT)
  // =============================

  const isExactActive = item.path ? pathname === item.path : false;

  const isParentActive = item.path
    ? pathname.startsWith(item.path + "/")
    : false;

  const childActive = item.children?.some((c) => pathname === c.path) ?? false;

  const isActive = isExactActive || isParentActive || childActive;

  // =============================
  // STATE OPEN (EXPANDED MODE)
  // =============================

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (childActive) {
      setOpen(true);
    }
  }, [childActive]);

  // =============================
  // COLLAPSED MODE (ISOLATED)
  // =============================

  if (collapsed) {
    return (
      <div
        className="relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* ICON */}
        <div
          className={`
          flex items-center justify-center
          px-3 py-2 rounded-lg
          transition
          ${
            isActive
              ? "bg-slate-900 text-white"
              : "hover:bg-slate-100 text-slate-600"
          }
        `}
        >
          <Icon className="w-5 h-5" />
        </div>

        {/* BRIDGE */}
        {hovered && (
          <div
            className="
            absolute
            left-full
            top-0
            w-4
            h-full
          "
          />
        )}

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{
                opacity: 0,
                x: -10,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: -10,
              }}
              transition={{
                duration: 0.15,
              }}
              className="
              absolute
              left-full
              top-0
              ml-2
              min-w-56
              rounded-lg
              bg-gray-100/50
              shadow-xl
              z-50
            "
            >
              <div className="border-b px-3 py-2 font-semibold text-slate-600">
                {item.label}
              </div>

              {hasChildren ? (
                item.children!.map((child) => {
                  const active = pathname === child.path;

                  return (
                    <Link
                      key={child.path}
                      href={child.path}
                      className={`
                      block px-3 py-2 text-sm transition
                      ${
                        active
                          ? "bg-slate-700 text-white"
                          : "hover:bg-slate-100  text-slate-500"
                      }
                    `}
                    >
                      {child.label}
                    </Link>
                  );
                })
              ) : (
                <Link
                  href={item.path ?? "#"}
                  className="
                  block px-3 py-2 text-sm
                  hover:bg-slate-100
                  text-slate-500
                "
                >
                  {item.label}
                </Link>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // =============================
  // EXPANDED MODE
  // =============================

  return (
    <div className="relative">
      {/* MAIN ITEM */}
      {hasChildren ? (
        <button
          onClick={() => setOpen(!open)}
          className={`
            w-full flex items-center gap-3
            px-3 py-2 rounded-lg
            transition
            ${
              isActive
                ? "bg-slate-900 text-white"
                : "hover:bg-slate-100 text-slate-600"
            }
          `}
        >
          <Icon className="w-5 h-5" />

          <span className="flex-1 text-left text-slate-700">{item.label}</span>

          <span
            className={`
              transition-transform
              ${open ? "rotate-90" : ""}
            `}
          >
            <SvgArrowDown />
          </span>
        </button>
      ) : (
        <Link
          href={item.path ?? "#"}
          className={`
            flex items-center gap-3
            px-3 py-2 rounded-lg
            transition
            ${
              isExactActive
                ? "bg-slate-200 text-slate-700"
                : "hover:bg-slate-100 text-slate-600"
            }
          `}
        >
          <Icon className="w-5 h-5" />
          <span>{item.label}</span>
        </Link>
      )}

      {/* CHILDREN */}
      <AnimatePresence>
        {open && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="ml-10 overflow-hidden"
          >
            {item.children!.map((child) => {
              const active = pathname === child.path;

              return (
                <Link
                  key={child.path}
                  href={child.path}
                  className={`
                    block px-2 py-1 text-sm rounded
                    transition
                    ${active ? "bg-slate-800 text-white" : "hover:bg-slate-100 text-slate-600"}
                  `}
                >
                  {child.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
