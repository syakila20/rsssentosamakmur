"use client";

import SvgArrow from "@/Icon/Arrow";
import { motion } from "framer-motion";
import Link from "next/link";

interface ITitle {
  title: string;
  linkTo?: string;
}

const Title = ({ title, linkTo }: ITitle) => {
  return (
    <section className="py-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {/* Title */}
        <div className="flex flex-row gap-2 items-center sm:w-70 lg:w-130">
          <h1 className="text-2xl leading-tight font-semibold text-slate-700  capitalize lg:text-3xl">
            {title}
          </h1>
          {linkTo && (
            <Link href={linkTo}>
              <SvgArrow
                height="25"
                className="text-neutral-700 w-10 hover:text-blue-500 cursor-pointer"
              />
            </Link>
          )}
        </div>

        {/* Garis putus-putus */}
        <div className="mt-2 flex items-center gap-1">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
            className="inline-block h-1 w-20 rounded-full bg-blue-500"
          ></motion.span>

          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
            className="inline-block h-1 w-3 rounded-full bg-blue-500"
          ></motion.span>

          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
            className="inline-block h-1 w-1 rounded-full bg-blue-500"
          ></motion.span>
        </div>
      </motion.div>
    </section>
  );
};

export default Title;
