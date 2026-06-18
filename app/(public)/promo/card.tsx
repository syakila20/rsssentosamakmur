"use client";

import { motion } from "framer-motion";
import SafeImage from "@/Component/SafeImage/SafeImage";
import { formatRupiah } from "@/lib/helper";
import { IPromoCard } from "@/types/type";
import { getPromoExpiry } from "@/lib/helperDate";
import Link from "next/link";

interface PromoCardProps {
  promo: IPromoCard;
  index: number;
}

export default function PromoCardLuxury({ promo, index }: PromoCardProps) {
  const isExpiringSoon = getPromoExpiry(new Date(promo.endDate), 3);

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="relative"
    >
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-100 relative">
        {isExpiringSoon?.isExpired && (
          <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-[10px] px-2 py-1 rounded-full">
            {isExpiringSoon?.label}
          </div>
        )}

        <div className="relative h-32 w-full">
          <SafeImage
            src={promo?.image as string}
            alt={promo.title}
            fill
            className="object-cover"
          />
        </div>

        <Link href={`/promo/${promo?.category?.slug}/${promo?.slug}`}>
          <div className="p-3">
            <h3 className="text-sm font-semibold text-slate-700 line-clamp-2 mt-1 h-10">
              {promo.title}
            </h3>

            <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
              {promo.shortDescription}
            </p>

            {/* PRICE */}
            <div className="mt-3 flex items-end justify-between">
              <div>
                <p className="text-[10px] line-through text-slate-400">
                  {formatRupiah(Number(promo.originalPrice || 0))}
                </p>
                <p className="text-sm font-bold text-emerald-600">
                  {formatRupiah(Number(promo.promoPrice || 0))}
                </p>
              </div>

              <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                -{promo.discountPercent}%
              </span>
            </div>
          </div>
        </Link>

        {/* CUT LINE STYLE (TIKET EFFECT) */}
      </div>
    </motion.div>
  );
}
