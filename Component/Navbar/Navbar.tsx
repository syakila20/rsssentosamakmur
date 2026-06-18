"use client";
import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { getLastPathname } from "@/lib/getPath";
import { IMenuItem } from "@/types/type";

interface IMenuItemWithChildren extends IMenuItem {
  children?: IMenuItem[];
}
const itemVariants = {
  hidden: { opacity: 0, y: -4 },
  visible: { opacity: 1, y: 0 },
};
const MENU_ITEMS: IMenuItemWithChildren[] = [
  { label: "Tentang Kami", key: "about", href: "/about" },
  { label: "Artikel", key: "article", href: "/article" },
  { label: "Karir", key: "career", href: "/career" },
  {
    label: "Promo",
    key: "promo",
    href: "/promo",
    children: [],
  },
];

const TOP_MENU = [
  { label: "Emergency", key: "emergency", href: "/igd" },
  { label: "Cari Dokter", key: "findDoctor", href: "/doctor" },
  { label: "MCU", key: "mcu", href: "/promo" },
  { label: "daftar/login", key: "login", href: "/login" },
];

export default function Navbar() {
  const nameOfPath = getLastPathname();
  const isNotHome = nameOfPath?.lastOfPath !== "";
  const [isSolid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSub, setActiveSub] = useState<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeModal = () => {
    setOpen(false);
    setActiveSub(null);
  };

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.div
        className={clsx(
          "fixed px-4 py-1 top-0 w-full z-40 flex items-center justify-end",
          isSolid ? "bg-white" : "bg-black/20 backdrop-blur-md",
        )}
      >
        {/* <Link href="/">
          <div className="bg-amber-950 px-2 py-2 text-[9.5pt] lg:text-[12pt] md:[text-10pt]">
            LOGO
          </div>
        </Link> */}

        <div
          className={clsx(
            "h-10 flex items-center text-xs uppercase tracking-wider divide-x",
            isSolid || isNotHome ? "divide-black/30" : "divide-white/30",
          )}
        >
          {TOP_MENU?.map((item, i) => (
            <Link
              href={item?.href}
              key={i}
              className={clsx(
                "px-3 cursor-pointer",
                isSolid || isNotHome
                  ? "text-gray-600 hover:text-gray-800"
                  : "text-white hover:text-gray-300",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </motion.div>

      {/* MAIN NAV */}
      <motion.nav
        className={`fixed top-12 left-0 w-full z-20 transition-all 
          ${isSolid || isNotHome ? "bg-white/40 backdrop-blur-3xl shadow-lg outline outline-white/55" : "bg-transparent"}
        `}
      >
        <div className="px-6 h-15 flex items-center justify-between">
          <motion.div
            animate={{ scale: isSolid ? 0.9 : 1 }}
            transition={{ duration: 0.3 }}
            className="origin-left text-white font-bold text-2xl relative"
          >
            <Link href="/">
              <div
                className=" 
              z-155 relative
              left-10
              "
              >
                <Image
                  src="/apple-touch-icon.png"
                  alt="Logo"
                  height={10}
                  width={40}
                  className="object-cover"
                />
              </div>
            </Link>
          </motion.div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex gap-10 text-sm uppercase tracking-wider text-white">
            {MENU_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className="relative"
                onMouseEnter={() => {
                  if (timeoutRef.current) clearTimeout(timeoutRef.current);
                  setActiveSub(idx);
                }}
                onMouseLeave={() => {
                  timeoutRef.current = setTimeout(
                    () => setActiveSub(null),
                    200,
                  );
                }}
              >
                <a
                  href={item.href || "#"}
                  className={` ${isSolid || isNotHome ? "text-gray-600 hover:text-neutral-500 " : "text-white hover:text-white/30"}`}
                >
                  {item?.label}
                </a>
                <span
                  className={clsx(
                    "mx-2 ",
                    isSolid ? "text-black/40" : "text-white/50",
                  )}
                >
                  •
                </span>

                {/* SUBMENU DESKTOP */}
                <AnimatePresence>
                  {item.children && activeSub === idx && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10, transition: { delay: 0.15 } }}
                      className={`
                        absolute top-full mt-3
                        min-w-45
                        bg-black/80 backdrop-blur-xl
                        rounded-lg shadow-xl
                        overflow-hidden
                        ${idx >= MENU_ITEMS.length - 1 ? "right-0" : "left-0"}
                      `}
                    >
                      {item.children.map((sub, i) => (
                        <motion.a
                          key={i}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          href={sub?.href}
                          className="block px-4 py-2 text-xs hover:bg-white/10"
                        >
                          {sub?.key}
                        </motion.a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-xl text-slate-900
            "
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={{
              hidden: { opacity: 0, y: -10, scale: 0.98 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.25, ease: "easeOut" },
              },
              exit: {
                opacity: 0,
                y: -5,
                scale: 0.98,
                transition: { duration: 0.2, ease: "easeIn" },
              },
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="
              fixed top-24 right-6 z-40
              bg-black/90 backdrop-blur-xl
              px-6 py-5
              rounded-xl shadow-xl
              text-sm uppercase tracking-wider
              text-white w-60
            "
          >
            {MENU_ITEMS.map((item, idx) => (
              <div key={idx} className="mb-4">
                {item?.children ? (
                  <button
                    onClick={() => setActiveSub(activeSub === idx ? null : idx)}
                    className="w-full flex justify-between"
                  >
                    <span className="uppercase"> {item.key}</span>
                    {item.children && <span>▾</span>}
                  </button>
                ) : (
                  <Link href={item?.href || "/"} onClick={closeModal}>
                    {item.label}
                  </Link>
                )}

                {/* SUBMENU MOBILE */}
                <AnimatePresence>
                  {item.children && activeSub === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.05 } },
                      }}
                      className="ml-3 mt-2 flex flex-col gap-2 overflow-hidden"
                    >
                      {item.children.map((sub, i) => (
                        <motion.a
                          key={i}
                          href={sub.href}
                          onClick={closeModal}
                          className="text-xs text-gray-300 hover:text-white "
                        >
                          {sub.key}
                        </motion.a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
