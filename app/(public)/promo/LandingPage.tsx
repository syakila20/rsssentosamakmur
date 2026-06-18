"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { formatRupiah } from "@/lib/helper";

interface Promo {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
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

  isFeatured?: boolean;
}

interface Props {
  promos: Promo[];
}

export default function PromoLandingPage({ promos }: Props) {
  const featured = promos.find((p) => p.isFeatured);
  const others = promos.filter((p) => !p.isFeatured);

  return (
    <main className="min-h-screen bg-gradient-to-br from-fuchsia-50 via-white to-teal-50">
      {/* HERO MINI */}
      <section className="max-w-7xl mx-auto px-4 pt-16 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-slate-700">
            Promo Kesehatan Terbaik
          </h1>
          <p className="text-slate-500 mt-2">
            Penawaran eksklusif layanan kesehatan untuk Anda & keluarga
          </p>
        </motion.div>
      </section>

      {/* FEATURED PROMO */}
      {featured && (
        <section className="max-w-7xl mx-auto px-4 pb-10">
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 grid md:grid-cols-2">
            {/* IMAGE */}
            <div className="relative h-64 md:h-full">
              <Image
                src={featured.image || "/placeholder.jpg"}
                alt={featured.title}
                fill
                className="object-cover"
              />
            </div>

            {/* CONTENT */}
            <div className="p-6 flex flex-col justify-center">
              <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full w-fit">
                Featured Promo
              </span>

              <h2 className="text-2xl font-bold mt-3 text-slate-700">
                {featured.title}
              </h2>

              <p className="text-slate-500 mt-2 text-sm">
                {featured.shortDescription}
              </p>

              <div className="mt-4 flex items-end gap-3">
                <p className="text-lg font-bold text-emerald-600">
                  {formatRupiah(featured.promoPrice)}
                </p>
                <p className="text-sm line-through text-slate-400">
                  {formatRupiah(featured.originalPrice)}
                </p>
              </div>

              <Link
                href={`/promo/${featured.slug}`}
                className="mt-5 inline-flex w-fit bg-emerald-600 text-white px-5 py-2 rounded-xl hover:opacity-90 transition"
              >
                Lihat Detail
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* GRID PROMO */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <h3 className="text-lg font-semibold text-slate-700 mb-6">
          Promo Lainnya
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {others.map((promo, i) => {
            const isExpiringSoon = true;
            // differenceInDays(new Date(promo.endDate), new Date()) <= 7;

            return (
              <motion.div
                key={promo.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden relative"
              >
                {/* BADGE */}
                {isExpiringSoon && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-2 py-1 rounded-full z-10">
                    Segera Berakhir
                  </div>
                )}

                {/* IMAGE */}
                <div className="relative h-28 w-full">
                  <Image
                    src={"/og.png"}
                    alt={promo.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-3">
                  <p className="text-[10px] text-emerald-600">
                    {/* {promo.category.name || "Category"} */}
                    Nama Kategoru
                  </p>

                  <h4 className="text-sm font-semibold text-slate-700 line-clamp-2 mt-1">
                    {promo.title}
                  </h4>

                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    {promo.shortDescription}
                  </p>
                  <div className="absolute left-0 right-0 bottom-19 xl:bottom-18 md:bottom-20 flex items-center">
                    <div className="w-3 h-3 bg-linear-to-br bg-white border border-slate-400/40 rounded-full -ml-1" />
                    <div className="flex-1 border-t border-dashed border-slate-500" />
                    <div className="w-3 h-3 bg-linear-to-br bg-white border border-slate-400/40 rounded-full -mr-1" />
                  </div>

                  <div className="mt-3 flex justify-between items-end">
                    <div>
                      <p className="text-[10px] line-through text-slate-400">
                        {formatRupiah(promo.originalPrice)}
                      </p>
                      <p className="text-sm font-bold text-emerald-600">
                        {formatRupiah(promo.promoPrice)}
                      </p>
                    </div>

                    <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                      -{promo.discountPercent}%
                    </span>
                  </div>

                  <Link
                    href={`/promo/${promo.slug}`}
                    className="mt-3 text-xs text-center text-emerald-600 hover:underline"
                  >
                    Lihat Detail →
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
