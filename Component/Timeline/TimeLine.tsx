"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";

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

export default function HospitalHero() {
  const ref = useRef(null);
  const [hovered, setHovered] = useState<number | null>(null);

  // scroll progress
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.2", "end 0.85"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    mass: 0.3,
  });

  const scaleY = useTransform(smoothProgress, [0, 1], [0, 1]);
  return (
    <div ref={ref} className="relative max-w-3xl mx-auto px-6 z-10">
      <div className="absolute left-4 top-0 w-1 h-full bg-emerald-100/50 rounded-full" />

      <motion.div
        style={{ scaleY }}
        className="absolute left-4 top-0 w-1 h-full bg-emerald-500 origin-top rounded-full"
      />

      {timelineData.map((item, index) => (
        <motion.div
          key={index}
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: index * 0.1,
          }}
          viewport={{ once: false, amount: 0.4 }}
          className="relative mb-20 ml-12"
        >
          {/* DOT */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: index * 0.1,
            }}
            className="absolute -left-10 top-1.5 w-5 h-5 bg-emerald-500 rounded-full border-4 border-white shadow-md"
          />

          {/* CONTENT */}
          <h3 className="text-emerald-600 font-semibold">{item.year}</h3>
          <h4 className="text-lg font-semibold text-slate-700">{item.title}</h4>
          <p className="text-slate-700/9">{item.desc}</p>

          {/* HOVER CARD */}
          {hovered === index && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="absolute left-64 top-0 w-64 p-4 bg-white shadow-xl rounded-xl border"
            >
              <h5 className="font-semibold text-blue-600 mb-1">{item.title}</h5>
              <p className="text-sm text-slate-600">{item.desc}</p>
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
