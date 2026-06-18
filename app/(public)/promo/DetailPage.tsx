"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { formatCurrency } from "@/lib/formatCurrency";
import { differenceInDays } from "date-fns";

interface PromoBenefit {
  id: number;
  title: string;
}

interface Promo {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;

  image?: string | null;

  startDate: string;
  endDate: string;

  originalPrice: number;
  promoPrice: number;
  discountPercent: number;

  category: {
    name: string;
    slug: string;
  };

  patientRecommendation?: string;
  preparation?: string;
  termsCondition?: string;

  benefits: PromoBenefit[];
}

interface Props {
  promo: Promo;
}

export default function PromoDetailPage({ promo }: Props) {
  const isExpiringSoon =
    differenceInDays(new Date(promo.endDate), new Date()) <= 7;

  return (
    <main className="bg-gradient-to-br from-fuchsia-50 via-white to-teal-50 min-h-screen">
      {/* HERO */}
      <section className="relative">
        <div className="relative h-[320px] md:h-[420px] w-full">
          <Image
            src={promo.image || "/placeholder.jpg"}
            alt={promo.title}
            fill
            className="object-cover"
            priority
          />

          {/* overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        {/* HERO CONTENT */}
        <div className="absolute bottom-6 left-6 right-6 md:left-10 md:right-10 text-white">
          <span className="text-xs bg-emerald-500 px-3 py-1 rounded-full">
            {promo.category.name}
          </span>

          <h1 className="text-2xl md:text-4xl font-bold mt-3">{promo.title}</h1>

          <p className="text-sm md:text-base text-white/80 mt-2 max-w-2xl">
            {promo.shortDescription}
          </p>

          {isExpiringSoon && (
            <div className="mt-3 inline-flex text-xs bg-red-500 px-3 py-1 rounded-full">
              🔥 Segera Berakhir
            </div>
          )}
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="md:col-span-2 space-y-6">
          {/* DESCRIPTION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 border border-slate-100"
          >
            <h2 className="text-lg font-semibold text-slate-700 mb-3">
              Deskripsi Promo
            </h2>
            <p className="text-slate-600 leading-relaxed whitespace-pre-line">
              {promo.description}
            </p>
          </motion.div>

          {/* BENEFITS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 border border-slate-100"
          >
            <h2 className="text-lg font-semibold text-slate-700 mb-4">
              Pemeriksaan Termasuk
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {promo.benefits.map((b) => (
                <div
                  key={b.id}
                  className="flex items-start gap-2 text-sm text-slate-600"
                >
                  <span className="text-emerald-500">✔</span>
                  {b.title}
                </div>
              ))}
            </div>
          </motion.div>

          {/* INFO MEDIS */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl border">
              <h3 className="font-semibold text-slate-700 mb-2">
                Rekomendasi Pasien
              </h3>
              <p className="text-sm text-slate-600">
                {promo.patientRecommendation}
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border">
              <h3 className="font-semibold text-slate-700 mb-2">Persiapan</h3>
              <p className="text-sm text-slate-600 whitespace-pre-line">
                {promo.preparation}
              </p>
            </div>
          </div>

          {/* TERMS */}
          <div className="bg-white p-6 rounded-2xl border">
            <h3 className="font-semibold text-slate-700 mb-2">
              Syarat & Ketentuan
            </h3>
            <p className="text-sm text-slate-600 whitespace-pre-line">
              {promo.termsCondition}
            </p>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6 sticky top-6 h-fit">
          {/* PRICE CARD */}
          <div className="bg-white rounded-2xl border p-6 shadow-sm">
            <p className="text-xs text-slate-500">Harga Promo</p>

            <div className="mt-2">
              <p className="text-3xl font-bold text-emerald-600">
                {formatCurrency(promo.promoPrice)}
              </p>

              <p className="text-sm line-through text-slate-400">
                {formatCurrency(promo.originalPrice)}
              </p>
            </div>

            <div className="mt-4 bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full w-fit">
              Hemat {promo.discountPercent}%
            </div>

            <Link
              href="/booking"
              className="mt-5 block text-center bg-emerald-600 text-white py-3 rounded-xl hover:opacity-90 transition"
            >
              Booking Sekarang
            </Link>

            <p className="text-[11px] text-slate-400 mt-3 text-center">
              *Tersedia selama periode promo
            </p>
          </div>

          {/* META INFO */}
          <div className="bg-white rounded-2xl border p-5 text-sm text-slate-600">
            <p>
              <span className="font-medium">Periode:</span>
              <br />
              {new Date(promo.startDate).toLocaleDateString()} -{" "}
              {new Date(promo.endDate).toLocaleDateString()}
            </p>

            <p className="mt-3">
              <span className="font-medium">Kategori:</span>
              <br />
              {promo.category.name}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
