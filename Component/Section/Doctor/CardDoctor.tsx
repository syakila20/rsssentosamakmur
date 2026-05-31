"use client";
import SafeImage from "@/Component/SafeImage/SafeImage";
import { formatTime, getDayName } from "@/lib/helperDate";
import { toSlug } from "@/lib/toSlug";
import { IDoctorCard } from "@/types/type";
import { motion } from "framer-motion";
import Link from "next/link";
interface IObjDoctor {
  doctor: IDoctorCard;
}

export default function DoctorCard({ doctor }: IObjDoctor) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-45 lg:w-50 md:w-52 xl:w-52
             rounded-2xl bg-white/70 backdrop-blur-xl border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
    >
      <div className="relative w-full h-45 lg:h-50 md:h-50 ">
        <SafeImage
          src={doctor?.image || ""}
          alt={doctor?.name}
          fill
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 rounded-tl-2xl rounded-tr-2xl"
        />
        {doctor?.isOnline && (
          <span className="absolute top-3 right-3 text-[10px] px-2 py-1 rounded-full bg-emerald-500/90 text-white">
            Available
          </span>
        )}
        <Link
          href={`/doctor/${toSlug(doctor?.specialty?.label as string)}/${toSlug(doctor?.name)}`}
        >
          <div
            className="
    absolute bottom-0 left-0 w-full
    px-3 py-2
    bg-linear-to-t
    from-white/50
    via-slate-900/45
    to-transparent
    backdrop-blur-[2px]
  "
          >
            <h3 className="text-sm font-semibold text-slate-100 leading-tight drop-shadow">
              {doctor?.name}
            </h3>

            <div className="w-10 h-0.5 rounded-full mt-0.5 mb-2" />
            <p className="text-xs text-slate-200 font-medium tracking-wide">
              {doctor?.specialty?.label}
            </p>
          </div>
        </Link>
      </div>

      <div className="px-3 py-4 h-25">
        <div className="flex flex-col gap-2">
          {doctor?.schedules
            ?.slice()
            .sort((a, b) => a.day - b.day)
            .map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-[11px] text-gray-600"
              >
                <div className="flex flex-nowrap">
                  <span className="w-8">{getDayName(item?.day)}</span>
                </div>
                <div className="font-medium text-gray-800">
                  {formatTime(item?.startTime)} - {formatTime(item?.endTime)}
                </div>
              </div>
            ))}
        </div>
      </div>
    </motion.div>
  );
}
