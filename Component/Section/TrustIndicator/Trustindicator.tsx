"use client";

import Counter from "@/Component/Counter/Counter";
import { useEffect, useRef, useState } from "react";

export default function TrustIndicator() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const stats = [
    { value: 150, suffix: "+", label: "Dokter Subspesialis" },
    { value: 30, suffix: "+", label: "Tahun Pengalaman" },
    { value: 50000, suffix: "+", label: "Pasien per Tahun" },
  ];

  return (
    <section className="overflow-hidden h-auto relative py-24">
      <div className="absolute -top-32 -left-32 w-md h-112 bg-amber-200/10 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>

      <div
        ref={sectionRef}
        className="w-[95%] md:w-[85%] xl:w-[85%] mx-auto relative"
      >
        <div
          className={`text-center mx-auto mb-20 transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-700 tracking-tight">
            Dipercaya sebagai Pusat Rujukan Kesehatan
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Didukung oleh tenaga medis profesional dan fasilitas modern
            berstandar nasional.
          </p>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-4 justify-center text-center">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`transition-all w-30 md:w-100 lg:w-100 xl:w-100 duration-1000 delay-${index * 200} ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h3 className="text-4xl lg:text-5xl xl:text-5xl md:text-5xl font-extrabold bg-linear-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
                <Counter end={stat.value} suffix={stat.suffix} />
              </h3>
              <p className="mt-4 text-sm md:text-base font-medium text-slate-700 tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
