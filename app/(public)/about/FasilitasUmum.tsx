"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const facilities = [
  {
    id: 1,
    title: "Rawat Inap",
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1600&auto=format&fit=crop",
    description:
      "Layanan rawat inap modern dengan kenyamanan premium dan pemantauan pasien 24 jam.",
  },
  {
    id: 2,
    title: "Poli Spesialis",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1600&auto=format&fit=crop",
    description:
      "Dokter spesialis profesional dengan dukungan teknologi medis modern.",
  },
  {
    id: 3,
    title: "Laboratorium",
    image:
      "https://images.unsplash.com/photo-1579165466741-7f35e4755660?q=80&w=1600&auto=format&fit=crop",
    description:
      "Hasil pemeriksaan cepat dan akurat dengan peralatan laboratorium terkini.",
  },
  {
    id: 4,
    title: "Fasilitas Umum",
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1600&auto=format&fit=crop",
    description:
      "Cafeteria, mushola, ruang tunggu nyaman, dan fasilitas pendukung lainnya.",
  },
];

export default function FacilityScrollSection() {
  const [active, setActive] = useState(1);

  useEffect(() => {
    const sections = document.querySelectorAll("[data-section]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(Number(entry.target.id));
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-20% 0px -20% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleScrollTo = (id: number) => {
    const el = document.getElementById(String(id));

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  return (
    <section className="relative bg-white">
      <div className="flex">
        {/* SIDEBAR */}
        <aside className="sticky top-0 hidden h-screen w-80 border-r border-slate-200 bg-white lg:flex">
          <div className="flex w-full flex-col justify-center px-10">
            <span className="text-sm font-medium uppercase tracking-[0.3em] text-emerald-600">
              Hospital Service
            </span>

            <h2 className="mt-6 text-5xl font-bold leading-tight text-slate-800">
              Fasilitas &
              <br />
              Layanan
            </h2>

            <p className="mt-6 max-w-xs leading-relaxed text-slate-500">
              Pelayanan kesehatan modern dengan fasilitas terbaik untuk
              kenyamanan pasien dan keluarga.
            </p>

            {/* MENU */}
            <div className="mt-16 space-y-6">
              {facilities.map((item) => {
                const isActive = active === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleScrollTo(item.id)}
                    className="group flex items-center gap-4 text-left"
                  >
                    {/* BULLET */}
                    <div
                      className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                        isActive
                          ? "scale-100 bg-emerald-500"
                          : "scale-0 bg-transparent group-hover:scale-75 group-hover:bg-slate-400"
                      }`}
                    />

                    {/* TEXT */}
                    <span
                      className={`text-lg transition-all duration-300 ${
                        isActive
                          ? "translate-x-1 font-semibold text-emerald-700"
                          : "font-normal text-slate-500 group-hover:text-slate-800"
                      }`}
                    >
                      {item.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* CONTENT */}
        <div className="flex-1">
          {facilities.map((item, index) => (
            <section
              key={item.id}
              id={String(item.id)}
              data-section
              className="relative flex h-screen items-end overflow-hidden"
            >
              <motion.div
                initial={{ scale: 1.08 }}
                whileInView={{ scale: 1 }}
                transition={{
                  duration: 1.4,
                  ease: "easeOut",
                }}
                viewport={{ amount: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  priority={index === 0}
                  className="object-cover"
                />
              </motion.div>

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* CONTENT */}
              <motion.div
                // initial={{
                //   opacity: 0,
                //   y: 60,
                // }}
                // whileInView={{
                //   opacity: 1,
                //   y: 0,
                // }}
                // transition={{
                //   duration: 0.8,
                //   ease: "easeOut",
                // }}
                // viewport={{
                //   once: false,
                //   amount: 0.3,
                // }}
                // className="relative z-10 max-w-3xl p-10 md:p-20"
                initial={{
                  opacity: 0,
                  y: 60,
                  scale: 0.98,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                }}
                viewport={{
                  once: false,
                  amount: 0.3,
                }}
                className="relative z-10 max-w-3xl p-10 md:p-20"
              >
                <span className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm uppercase tracking-[0.3em] text-white backdrop-blur-xl">
                  Featured Facility
                </span>

                <h2 className="mt-8 text-5xl font-bold leading-tight text-white md:text-7xl">
                  {item.title}
                </h2>

                <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
                  {item.description}
                </p>

                <button className="mt-10 rounded-full bg-white px-8 py-4 font-medium text-black transition-all duration-300 hover:scale-105 hover:bg-emerald-400 hover:text-white">
                  Explore Service
                </button>
              </motion.div>

              {/* INDEX NUMBER */}
              <div className="absolute right-8 top-8 z-10 text-white/30">
                <span className="text-7xl font-bold">0{item.id}</span>
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
