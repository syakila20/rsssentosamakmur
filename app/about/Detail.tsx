"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import FacilitySection from "./FasilitasUmum";
import TimelineRumahSakit from "./Timeline";
import dynamic from "next/dynamic";

const LocationDynamicComponentWithNoSSR = dynamic(() => import("./Location"), {
  ssr: false,
});

export default function HospitalHero() {
  const missions = [
    "Memberikan pelayanan kesehatan terbaik dengan standar profesional tinggi",
    "Menghadirkan teknologi medis modern untuk diagnosis dan perawatan optimal",
    "Meningkatkan keselamatan dan kenyamanan pasien dalam setiap layanan",
    "Membangun kepedulian kesehatan bagi masyarakat secara berkelanjutan",
  ];

  const visions = [
    "Menjadi rumah sakit terpercaya dengan layanan kesehatan modern",
    "Mengutamakan inovasi medis dan pelayanan humanis",
    "Menciptakan lingkungan kesehatan yang aman dan nyaman",
    "Mendorong kualitas hidup masyarakat melalui pelayanan terbaik",
  ];

  return (
    <section className="w-full bg-white pt-32 md:pt-40 border">
      <div
        className="flex items-center w-[95%] md:w-[85%] xl:w-[85%] mx-auto relative
      flex-col-reverse gap-5 md:flex-row xl:flex-row
      "
      >
        <div className="space-y-6 ">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-yellow-400 flex items-center justify-center text-white font-bold">
              ★
            </div>
            <p className="text-sm text-slate-600">
              Accredited Healthcare Institution
            </p>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold leading-tight text-slate-600">
            RUMAH SAKIT
            <br />
            <span className="text-emerald-600">SENTOSA MAKMUR</span>
          </h1>

          <p className="text-slate-600 leading-relaxed text-sm md:text-base">
            Providing world-class healthcare services with modern facilities,
            advanced medical technology, and professional doctors.
          </p>
          <div className="flex gap-6 pt-4 flex-wrap">
            <div>
              <p className="text-xl md:text-2xl font-bold text-emerald-600">
                20+
              </p>
              <p className="text-xs text-gray-500">Years Experience</p>
            </div>
            <div>
              <p className="text-xl md:text-2xl font-bold text-emerald-600">
                100+
              </p>
              <p className="text-xs text-gray-500">Specialist Doctors</p>
            </div>
            <div>
              <p className="text-xl md:text-2xl font-bold text-emerald-600">
                24/7
              </p>
              <p className="text-xs text-gray-500">Emergency Care</p>
            </div>
          </div>
        </div>
        <div className="relative w-full h-64 md:h-100">
          <Image
            src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1600&auto=format&fit=crop"
            alt="Hospital Building"
            fill
            className="object-cover rounded-2xl"
            priority
          />
        </div>
      </div>
      <section className="relative overflow-hidden bg-gray-50 py-24">
        {/* BACKGROUND */}
        <div className="absolute inset-0 opacity-[0.04]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* GLOW */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />

          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-28 px-6">
          {/* ===================== */}
          {/* MISSION */}
          {/* ===================== */}

          <div className="grid items-center gap-14 lg:grid-cols-2">
            {/* IMAGE */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="h-105 w-full shadow-2xl rounded-4xl">
                <Image
                  src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1200&auto=format&fit=crop"
                  alt="Hospital Mission"
                  fill
                  className="rounded-4xl object-cover "
                />
              </div>

              {/* FLOATING CARD */}
              <motion.div className="absolute -bottom-10 right-8 overflow-hidden rounded-4xl border border-white/30 bg-white/80 p-3 shadow-2xl backdrop-blur-xl">
                <div className="h-64 w-52 rounded-3xl">
                  <Image
                    fill
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop"
                    alt="Doctor"
                    className="rounded-3xl object-cover"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* CONTENT */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-600">
                Our Mission
              </span>

              <h2 className="mt-6 text-5xl font-bold leading-tight text-gray-900">
                Memberikan Pelayanan
                <span className="block text-emerald-600">
                  Kesehatan Terbaik
                </span>
              </h2>

              <p className="mt-6 leading-relaxed text-gray-600">
                Rumah sakit kami berkomitmen untuk memberikan pelayanan
                kesehatan yang profesional, modern, dan berorientasi pada
                keselamatan pasien. Dengan dukungan tenaga medis berpengalaman
                serta teknologi terkini, kami hadir untuk memberikan kenyamanan
                dan kualitas layanan terbaik bagi masyarakat.
              </p>

              {/* LIST */}
              <div className="mt-8 space-y-5">
                {missions.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: i * 0.1,
                    }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-5 h-5 md:w-5 md:h-5 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">
                      ★
                    </div>

                    <p className="text-gray-700">{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <TimelineRumahSakit />

          <div className="grid items-center gap-14 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-medium text-cyan-600">
                Our Vision
              </span>

              <h2 className="mt-6 text-5xl font-bold leading-tight text-gray-900">
                Menjadi Rumah Sakit
                <span className="block text-cyan-600">Modern & Terpercaya</span>
              </h2>

              <p className="mt-6 leading-relaxed text-gray-600">
                Kami memiliki visi untuk menjadi pusat layanan kesehatan
                unggulan yang dipercaya masyarakat melalui inovasi medis,
                pelayanan humanis, serta komitmen terhadap kualitas dan
                keselamatan pasien secara berkelanjutan.
              </p>

              <div className="mt-8 space-y-5">
                {visions.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: i * 0.1,
                    }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-5 h-5 md:w-5 md:h-5 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">
                      ★
                    </div>
                    <p className="text-gray-700">{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative order-1 lg:order-2"
            >
              <div className="h-105 w-full rounded-4xl object-cover shadow-2xl">
                <Image
                  fill
                  src="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1200&auto=format&fit=crop"
                  alt="Hospital Vision"
                  className="rounded-4xl object-cover s"
                />
              </div>

              <motion.div className="absolute -bottom-10 left-8 overflow-hidden rounded-4xl border border-white/30 bg-white/80 p-3 shadow-2xl backdrop-blur-xl">
                <div className="h-64 w-52 rounded-3xl object-cover">
                  <Image
                    src="https://images.unsplash.com/photo-1581595219315-a187dd40c322?q=80&w=800&auto=format&fit=crop"
                    alt="Medical Team"
                    fill
                    className="rounded-3xl object-cover"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      <FacilitySection />
      <section className="relative overflow-hidden bg-gray-50 py-24">
        {/* GRID BACKGROUND */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* GLOW */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />

          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6">
          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mx-auto mb-16 max-w-3xl text-center"
          >
            <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-600">
              Medical Services
            </span>

            <h2 className="mt-6 text-5xl font-bold text-gray-900">
              How We Care
            </h2>

            <p className="mt-5 leading-relaxed text-gray-600">
              Kami menghadirkan pelayanan kesehatan profesional dengan dukungan
              tenaga medis berpengalaman, fasilitas modern, dan sistem pelayanan
              yang cepat, aman, serta berorientasi pada kenyamanan pasien.
            </p>
          </motion.div>
          <div className="grid gap-8 px-8 py-10 md:grid-cols-3">
            {/* CARD */}
            <motion.div
              whileHover={{
                y: -6,
              }}
              className="rounded-3xl border border-gray-100 bg-white/80 p-6 shadow-lg backdrop-blur-xl"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-2xl">
                🏥
              </div>

              <h3 className="text-xl font-bold text-gray-900">
                Modern Facilities
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Fasilitas kesehatan modern dengan teknologi medis terkini untuk
                mendukung diagnosis dan perawatan pasien secara optimal.
              </p>
            </motion.div>

            {/* CARD */}
            <motion.div
              whileHover={{
                y: -6,
              }}
              className="rounded-3xl border border-gray-100 bg-white/80 p-6 shadow-lg backdrop-blur-xl"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-2xl">
                👨‍⚕️
              </div>

              <h3 className="text-xl font-bold text-gray-900">
                Professional Doctors
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Didukung dokter spesialis dan tenaga medis profesional yang
                berpengalaman dalam berbagai bidang pelayanan kesehatan.
              </p>
            </motion.div>

            {/* CARD */}
            <motion.div
              whileHover={{
                y: -6,
              }}
              className="rounded-3xl border border-gray-100 bg-white/80 p-6 shadow-lg backdrop-blur-xl"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-100 text-2xl">
                🚑
              </div>

              <h3 className="text-xl font-bold text-gray-900">
                Emergency Service
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Layanan gawat darurat 24 jam dengan respon cepat untuk
                memastikan keselamatan pasien kapan pun dibutuhkan.
              </p>
            </motion.div>
          </div>

          {/* VIDEO CARD */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-[2.5rem] border border-white/30 bg-white/70 shadow-2xl backdrop-blur-xl"
          >
            {/* VIDEO */}
            <div className="relative h-150 w-full overflow-hidden">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/pdv5H6bHAE0?autoplay=0&rel=0"
                title="Hospital Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* BOTTOM CONTENT */}
          </motion.div>
        </div>
      </section>
      <LocationDynamicComponentWithNoSSR />
    </section>
  );
}
