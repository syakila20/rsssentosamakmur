"use client";
import { toSlug } from "@/lib/toSlug";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Props {
  name: string;
  specialty: string;
  location: string;
  image: string;
  experience: string;
  rating: number;
  reviews: number;
  isOnline?: boolean;
  slug: string;
  spesialitySlug?: string;
}

export default function DoctorCard({
  name,
  specialty,

  isOnline,
  slug,
  spesialitySlug,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-45 lg:w-50 md:w-52 xl:w-52
             rounded-2xl bg-white/70 backdrop-blur-xl border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
    >
      <div className="relative h-45 lg:h-50 md:h-50 ">
        <Image
          src="/doctor.webp"
          alt="doctor"
          className="object-fill rounded-tl-2xl rounded-tr-2xl"
          fill
        />
        {isOnline && (
          <span className="absolute top-3 right-3 text-[10px] px-2 py-1 rounded-full bg-emerald-500/90 text-white">
            Available
          </span>
        )}
        <Link
          href={`/doctor/${toSlug(spesialitySlug as string)}/${toSlug(slug)}`}
        >
          <div className="absolute bottom-0 left-0 w-full px-3 py-2 bg-linear-to-t from-blue-400/15 via-white to-white/0">
            <h3 className="text-sm font-semibold text-blue-900 leading-tight">
              {name}
            </h3>
            <hr className="w-10 mt-0.5 mb-0.5 border-blue-300/40" />
            <p className="text-xs text-gray-600">{specialty}</p>
          </div>
        </Link>
      </div>

      <div className="px-3 py-4 h-25">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-[11px] text-gray-600">
            <span>Senin - Jumat</span>
            <span className="font-medium text-gray-800">09.00 - 13.00</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-gray-600">
            <span>Senin - Jumat</span>
            <span className="font-medium text-gray-800">09.00 - 13.00</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
