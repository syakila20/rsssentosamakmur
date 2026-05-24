"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import SafeImage from "../SafeImage/SafeImage";
import { formatDate } from "@/lib/helperDate";
interface BlogCardProps {
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string | Date;
  slug: string;
}

export default function BlogCard({
  title,
  excerpt,
  image,
  category,
  date,
  slug,
}: BlogCardProps) {
  console.log("??imgage", image);
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative z-10 group rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-lg"
    >
      <div className="relative h-25 lg:h-40 md:h-35 overflow-hidden">
        <Link href={`/article/${slug}`} className="cursor-pointer">
          <div className="relative h-40 w-auto">
            <SafeImage
              src={image}
              alt={title}
              fill
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </Link>
        <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-[11px] font-medium bg-emerald-500/90 text-white backdrop-blur uppercase">
          {category}
        </span>

        <div className="absolute inset-0 bg-linear-to-t from-black/30 via-black/0 to-transparent" />
      </div>

      <div className="p-4">
        <Link href={`/article/${slug}`} className="cursor-pointer">
          <h3 className="text-base font-semibold text-slate-700/80 leading-snug line-clamp-2 xl:h-12 md:h-12 ">
            {title}
          </h3>
        </Link>
        <p className="text-[9.5pt] text-slate-400 line-clamp-2 xl:h-10 md:h-10">
          {excerpt}
        </p>
      </div>
      <div className="-mt-5 px-4 py-2 flex md:flex-row lg:flex-row xl:flex-row flex-col justify-between  gap-1 text-xs text-gray-400 w-full">
        <div className="flex items-center gap-1">
          <div className="rounded-2xl text-xs flex items-center text-blue-600/90">
            Kesling RS
          </div>
          <span>•</span>
          <span>{formatDate(date, "short")}</span>
        </div>
        <Link
          className="py-1 text-center text-emerald-700"
          href={`/article/${slug}`}
        >
          Baca..
        </Link>
      </div>
    </motion.article>
  );
}
