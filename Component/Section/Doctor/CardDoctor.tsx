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
  const schedules =
    doctor?.schedules?.slice().sort((a, b) => a.day - b.day) || [];

  const visibleSchedules = schedules.slice(0, 3);
  const remainingSchedules = schedules.length - 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="
        group
        w-45 lg:w-50 md:w-52 xl:w-52
        overflow-hidden
        rounded-2xl
        bg-white
        border border-slate-100
        shadow-[0_10px_30px_rgba(0,0,0,0.08)]
        hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)]
        transition-all duration-300
      "
    >
      <div className="relative w-full h-45 lg:h-50 md:h-50">
        <SafeImage
          src={doctor?.image || ""}
          alt={doctor?.name}
          fill
          sizes="
            (max-width: 640px) 100vw,
            (max-width: 1024px) 50vw,
            25vw
          "
          className="
            object-cover
            transition-transform
            duration-500
          "
        />

        {doctor?.isOnline && (
          <span
            className="
              absolute top-3 right-3
              rounded-full
              bg-emerald-500
              px-2.5 py-1
              text-[10px]
              font-medium
              text-white
              shadow-sm
            "
          >
            Available
          </span>
        )}

        <Link
          href={`/doctor/${toSlug(
            doctor?.specialty?.label as string,
          )}/${toSlug(doctor?.name)}`}
        >
          <div
            className="
              absolute bottom-0 left-0 w-full
              px-4 py-3
              bg-gradient-to-t
              from-slate-950/90
              via-slate-900/50
              to-transparent
            "
          >
            <h3 className="text-sm font-semibold text-white leading-tight">
              {doctor?.name}
            </h3>

            <p className="mt-1 text-xs text-slate-200">
              {doctor?.specialty?.label}
            </p>
          </div>
        </Link>
      </div>

      <div className="p-2">
        <div className="space-y-1">
          {visibleSchedules.map((item, idx) => (
            <div
              key={idx}
              className="
                flex items-center justify-between
                rounded-xl
                border border-slate-100
                bg-slate-50
                transition-colors
                duration-200
                hover:bg-slate-100
              "
            >
              <span
                className="
                  rounded-full
                  bg-white
                  px-2.5 py-1
                  text-[10px]
                  font-semibold
                  text-slate-600
                  shadow-sm
                "
              >
                {getDayName(item.day)}
              </span>

              <span className="text-[11px] font-semibold text-slate-800">
                {formatTime(item.startTime)} - {formatTime(item.endTime)}
              </span>
            </div>
          ))}
        </div>

        {remainingSchedules > 0 && (
          <Link
            href={`/doctor/${toSlug(
              doctor?.specialty?.label as string,
            )}/${toSlug(doctor?.name)}`}
          >
            <div
              className="
                mt-1
                py-1
                flex items-center justify-center
                rounded-xl
                border border-dashed border-slate-200
                bg-slate-50/70
                text-[11px]
                font-medium
                text-slate-500
                transition-all
                duration-200
                hover:border-slate-300
                hover:bg-slate-100
                hover:text-slate-700
              "
            >
              +{remainingSchedules} jadwal lainnya
              {remainingSchedules > 1 ? "s" : ""}
            </div>
          </Link>
        )}

        {schedules.length === 0 && (
          <div
            className="
              flex items-center justify-center
              rounded-xl
              border border-dashed border-slate-200
              bg-slate-50
              py-2
              text-[11px]
              text-slate-400
            "
          >
            Belum ada jadwal praktik
          </div>
        )}
      </div>
    </motion.div>
  );
}
