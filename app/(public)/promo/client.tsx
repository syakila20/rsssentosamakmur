"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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
}

interface Props {
  data: Promo[];
}

export default function PromoClients({ data }: Props) {
  return (
    <section className="min-h-screen bg-gradient-to-br from-fuchsia-50 via-white to-teal-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-700">Promo Kesehatan</h1>
          <p className="text-slate-500 mt-2">
            Penawaran terbaik untuk layanan kesehatan Anda
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4"></div>
      </div>
    </section>
  );
}
