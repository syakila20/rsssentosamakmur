"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const clients = [
  {
    id: 1,
    name: "BPJS Kesehatan",
    logo: "/bumn.png",
  },
  {
    id: 2,
    name: "Kimia Farma",
    logo: "/logo2.png",
  },
  {
    id: 3,
    name: "Halodoc",
    logo: "/logo5.png",
  },
  {
    id: 4,
    name: "Siloam Hospitals",
    logo: "/logo-liq.png",
  },
  {
    id: 4,
    name: "Siloam Hospitals",
    logo: "/mandiri.png",
  },
  {
    id: 5,
    name: "AIA",
    logo: "/AIA.png",
  },
];

export default function OurClientsSection() {
  return (
    <section className="relative overflow-hidden md:py-32">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.06),transparent_40%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">
            Trusted By
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
            Our Healthcare
            <br />
            Partners
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-slate-500">
            Dipercaya oleh institusi kesehatan dan layanan medis terpercaya.
          </p>
        </motion.div>

        {/* LOGOS */}
        <div className="mt-24 grid grid-cols-2 items-center gap-x-10 gap-y-16 md:grid-cols-4">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              viewport={{ once: true }}
              className="group flex items-center justify-center"
            >
              <Image
                src={client.logo}
                alt="client-logo"
                width={200}
                height={100}
                className="
                  h-auto max-h-20 w-auto
                  grayscale opacity-40
                  transition-all duration-500 ease-out
                  group-hover:scale-110
                  group-hover:grayscale-0
                  group-hover:opacity-100
                "
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
