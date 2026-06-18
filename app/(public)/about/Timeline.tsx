"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import SvgChevronLeft from "@/Icon/Chevron";

const timelineData = [
  {
    year: "1998",
    title: "Rumah Sakit Didirikan",
    desc: "Rumah sakit pertama kali didirikan dengan layanan dasar kesehatan.",
  },
  {
    year: "2005",
    title: "Ekspansi Gedung",
    desc: "Penambahan gedung baru untuk meningkatkan kapasitas pasien.",
  },
  {
    year: "2012",
    title: "Fasilitas Modern",
    desc: "Menghadirkan teknologi medis terbaru dan layanan spesialis.",
  },
  {
    year: "2020",
    title: "Digitalisasi Layanan",
    desc: "Implementasi sistem digital untuk meningkatkan pelayanan.",
  },
];

export default function TimelineRumahSakit() {
  const [active, setActive] = useState(0);
  const next = () => {
    if (active < timelineData.length - 1) setActive(active + 1);
  };

  const prev = () => {
    if (active > 0) setActive(active - 1);
  };

  return (
    <section>
      <div className="relative mb-12">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2" />

        <motion.div
          className="absolute top-1/2 left-0 h-1 bg-emerald-500 -translate-y-1/2"
          animate={{
            width: `${(active / (timelineData.length - 1)) * 100}%`,
          }}
          transition={{ duration: 0.4 }}
        />

        <div className="flex justify-between relative">
          {timelineData.map((item, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className="relative flex flex-col items-center"
            >
              <motion.div
                animate={{
                  scale: active === index ? 1.3 : 1,
                  backgroundColor: active >= index ? "#10b981" : "#d1d5db",
                }}
                className="w-4 h-4 rounded-full"
              />

              <span
                className={`mt-3 text-sm ${
                  active === index
                    ? "text-emerald-600 font-semibold"
                    : "text-gray-400"
                }`}
              >
                {item.year}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="relative min-h-50 flex w-full ">
        <div className="flex flex-none ">
          <button
            className="transition  text-emerald-600 cursor-pointer"
            onClick={prev}
          >
            <SvgChevronLeft className="" height="30" />
          </button>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-center flex-auto "
          >
            <h3 className="text-xl font-semibold text-emerald-600">
              {timelineData[active].year}
            </h3>

            <h4 className="text-lg font-semibold text-slate-700 mt-1">
              {timelineData[active].title}
            </h4>

            <p className="text-slate-500 mt-2 max-w-xl mx-auto">
              {timelineData[active].desc}
            </p>
          </motion.div>
          <div className="flex  flex-none cursor-pointer">
            <button
              className="transition  text-emerald-600 cursor-pointer"
              onClick={next}
            >
              <SvgChevronLeft className="rotate-180" height="30" />
            </button>
          </div>
        </AnimatePresence>
      </div>
    </section>
  );
}
