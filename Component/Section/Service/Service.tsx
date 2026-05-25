"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import Title from "@/Component/Title/Title";

const services = [
  {
    title: "Jantung",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
    image: "/monitor.png",
  },
  {
    title: "Paru",
    description: "Pelayanan kesehatan dasar untuk semua usia.",
    image: "/monitor.png",
  },
  {
    title: "Tumbuh Kembang Anak",
    description: "Layanan gawat darurat dengan tim medis siaga 24 jam.",
    image: "/monitor.png",
  },
  {
    title: "Radiologi",
    description: "CT Scan, MRI, dan X-Ray berstandar internasional.",
    image: "/monitor.png",
  },
  {
    title: "Ibu & Anak",
    description: "Pelayanan kesehatan ibu hamil dan anak.",
    image: "/monitor.png",
  },
];

const Service = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative h-auto overflow-x-visible ">
      <div className="w-[90%] md:w-[85%] xl:w-[85%] mx-auto">
        <Title title="Layanan" />
        <div className="flex flex-wrap items-center sm::flex-wrap-reverse">
          <div className="xl:w-1/2 lg:w-1/2 md:pr-12 mb-10 md:mb-0 ">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.1 }}
                className="flex flex-col gap-1"
              >
                <h1 className="sm:text-3xl text-2xl font-semibold mb-4 text-slate-700">
                  {services[activeIndex]?.title}
                </h1>
                <p className="leading-relaxed text-slate-600 max-w-xl ">
                  {services[activeIndex]?.description}
                </p>

                {/* <button className="text-blue-500 inline-flex items-center mt-4 cursor-pointer w-30">
                  <span className="w-100">Lihat Detail</span>
                  <SvgArrow height="18" className="pl-0.5 lh" />
                </button> */}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lg:w-1/2">
            <div
              className="
  flex flex-nowrap gap-4 overflow-x-auto pb-6
  snap-x snap-mandatory scroll-smooth
  lg:grid lg:grid-cols-4 lg:gap-6
  lg:overflow-visible lg:snap-none
"
            >
              {services.map((item, index) => (
                <motion.div
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  style={{ touchAction: "pan-x" }}
                  className={`
                    w-25
                    lg:w-45
                    md:w-38
                    xl:w-40
                    snap-center
                    min-w-[45%] lg:min-w-0
                    cursor-pointer rounded-xl bg-slate-100/60 transition border
                    flex flex-col
                    ${activeIndex === index ? "border-slate-200" : "border-transparent"}
                  `}
                >
                  <div className="w-full h-15 p-1 relative ">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="
(max-width: 640px) 100vw,
(max-width: 1024px) 50vw,
25vw
"
                      className="object-contain"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold h-10 text-center text-sm mb-1 text-slate-600">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 text-center">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
              <div className="snap-center min-w-[35%] lg:hidden" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Service;
