"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import SafeImage from "../SafeImage/SafeImage";
interface BlogCardProps {
  title: string;
  excerpt: string;
  image: string;
  category?: string;
  date: string;
  slug: string;
  author?: string;
}

export default function BlogCard({
  title,
  excerpt,
  image,
  category,
  date,
  slug,
  author,
}: BlogCardProps) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative z-10 group rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-lg"
    >
      <div className="relative h-25 lg:h-40 md:h-35 overflow-hidden">
        <Link href={`/article/${slug}`} className="cursor-pointer">
          <div className="relative h-40 w-auto overflow-hidden">
            <SafeImage
              src={image}
              alt={title}
              fill
              sizes="
                (max-width: 640px) 100vw,
                (max-width: 1024px) 50vw,
                25vw
              "
              className="object-cover brightness-75 group-hover:brightness-90 transition"
            />

            <div className="absolute inset-0 bg-black/10" />
          </div>
        </Link>
        <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-[11px] font-medium bg-emerald-500/10 text-white backdrop-blur uppercase">
          {category}
        </span>

        <div className="absolute inset-0 bg-linear-to-t from-black/30 via-black/0 to-transparent" />
      </div>

      <div className="p-4 flex flex-col gap-3">
        <Link href={`/article/${slug}`} className="cursor-pointer">
          <h1 className="text-base font-semibold text-slate-700/80 leading-snug line-clamp-2 xl:h-12 md:h-12 ">
            {title}
          </h1>
        </Link>
        {excerpt && (
          <p className="text-[9.5pt] text-slate-400 line-clamp-2 xl:h-10 md:h-10">
            {excerpt}
          </p>
        )}
      </div>
      <div className="-mt-3 px-4 py-2 flex flex-nowrap justify-between text-xs text-gray-400 w-full">
        <span>{date}</span>
        <Link
          className="text-center text-emerald-700 "
          href={`/article/${slug}`}
        >
          Selengkapnya
        </Link>
      </div>
    </motion.article>
  );
}
