"use client";
import React, { useState } from "react";

const Appointment = () => {
  const [copied, setCopied] = useState(false);
  const phoneNumber = "1-900-129";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(phoneNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden  w-[95%] md:w-[85%] xl:w-[85%] mx-auto py-4 rounded-3xl bg-gradient-to-br from-emerald-700 via-teal-600 to-emerald-600 text-white shadow-2xl">
      {/* Soft Luxury Background Glow */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px] animate-float"></div>
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-emerald-300/20 rounded-full blur-[120px] animate-float delay-2000"></div>

      <div className="relative z-10 px-10 py-6">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10">
          {/* Left Section */}
          <div className="max-w-xl space-y-2">
            <h2 className="text-sm tracking-[0.3em] uppercase text-white/80 font-light">
              RS SENTOSA MAKMUR
            </h2>

            <h1 className="text-2xl md:text-3xl font-semibold leading-tight">
              Pusat Janji Temu & Layanan Concierge Medis
            </h1>

            <p className="text-white/85 text-sm md:text-base">
              Jam Operasional Layanan Telepon 06:00 - 22.00 WIB
              <br />
              <span className="text-white/70">
                Layanan Booking Mandiri 24 jam via Website
              </span>
            </p>
          </div>

          <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row gap-5 m-auto lg:m-0 md:m-0 xl:m-0">
            <a
              href={`tel:${phoneNumber}`}
              className="group flex items-center w-60 md:w-60 lg:w-60 xl:w-60 gap-4 bg-white/15 backdrop-blur-xl border border-white/30 px-9 py-1.5 rounded-full shadow-lg hover:bg-white hover:text-emerald-700 transition-all duration-500
              "
            >
              <span className="text-2xl group-hover:scale-110 transition">
                📞
              </span>
              <div className="flex flex-col leading-tight">
                <span className="text-xs tracking-widest uppercase opacity-80">
                  Call Center
                </span>
                <span className="text-xl font-semibold tracking-wide">
                  {phoneNumber}
                </span>
              </div>
            </a>

            <button
              onClick={handleCopy}
              className="flex items-center w-60 md:w-60 lg:w-60 xl:w-60 gap-3 bg-white/10 backdrop-blur-xl border border-white/30 px-8 py-4 rounded-full hover:bg-white hover:text-emerald-700 transition-all duration-500"
            >
              <span>📋</span>
              <span className="text-sm font-medium tracking-wide">
                {copied ? "Number Copied" : "Copy Number"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Appointment;
