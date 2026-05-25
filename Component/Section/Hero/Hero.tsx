/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { SetStateAction, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Navbar/Sidebar";
import SvgArrow from "@/Icon/Arrow";
const thumbnails = [
  {
    src: "https://res.cloudinary.com/dzabbmtwf/image/upload/v1769746757/samples/landscapes/nature-mountains.jpg",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
    title: "Azadi Tower",
  },
  {
    src: "https://res.cloudinary.com/dzabbmtwf/image/upload/v1769746755/samples/landscapes/beach-boat.jpg",
    desc: "The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.",
    title: "Vakil Mosque",
  },
  {
    src: "https://res.cloudinary.com/dzabbmtwf/image/upload/v1769746752/samples/landscapes/girl-urban-view.jpg",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
    title: "Kids Alone",
  },
  {
    src: "https://res.cloudinary.com/dzabbmtwf/image/upload/v1769746754/samples/landscapes/architecture-signs.jpg",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
    title: "Broadway",
  },
  {
    src: "https://res.cloudinary.com/dzabbmtwf/image/upload/v1769746758/samples/landscapes/landscape-panorama.jpg",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
    title: "Panorama",
  },
  {
    src: "https://res.cloudinary.com/dzabbmtwf/image/upload/v1769746755/samples/people/bicycle.jpg",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
    title: "Bysicle",
  },
  {
    src: "https://res.cloudinary.com/dzabbmtwf/image/upload/v1769746753/samples/people/jazz.jpg",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
    title: "amyong",
  },
];
const extended = [
  thumbnails[thumbnails.length - 1],
  ...thumbnails,
  thumbnails[0],
];

const ITEM_WIDTH = 135 + 10;
const HeroSection = () => {
  const total = thumbnails.length;

  const [index, setIndex] = useState(1);
  const [active, setActive] = useState(thumbnails[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const next = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex((i) => i + 1);
  };

  const prev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex((i) => i - 1);
  };

  useEffect(() => {
    let realIndex = index - 1;

    if (index === 0) realIndex = total - 1;
    if (index === total + 1) realIndex = 0;

    setActive(thumbnails[realIndex]);
  }, [index, total]);

  const handleThumbnailClick = (
    item: SetStateAction<{ src: string; desc: string; title: string }>,
    idx: SetStateAction<number>,
  ) => {
    setIndex(idx);
    setActive(item);
  };

  useEffect(() => {
    let realIndex = index - 1;

    if (index === 0) realIndex = total - 1;
    if (index === total + 1) realIndex = 0;

    setActive(thumbnails[realIndex]);
  }, [index, total]);

  return (
    <section className="relative h-screen w-screen overflow-hidden text-white ">
      {/* BACKGROUND */}
      <motion.div
        key={active.src}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        <Image
          src={active.src}
          alt={active.title}
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-black/60" />

      <Sidebar />

      <div
        className="
    relative px-4
    md:absolute md:left-18 md:top-1/2 md:-translate-y-1/2
    w-3/4
    left-13
    top-1/4
     max-w-xl
    flex flex-col md:flex-row
    items-start gap-4
  "
      >
        {/* <span className="block text-4xl md:text-[30pt] font-bold leading-none">
            {String(index)?.padStart(2, "0")}
          </span> */}

        <div className="-mt-1">
          <motion.h1
            key={active.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 md:mb-6 text-2xl sm:text-3xl md:text-[42pt] font-bold leading-none"
          >
            {active.title}
          </motion.h1>
          <p className="mb-4 md:mb-6 text-sm leading-relaxed text-gray-200">
            {active.desc}
          </p>

          <button className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide cursor-pointer">
            Read More
            <span className="transition-transform group-hover:translate-x-1">
              <SvgArrow height="18" className="pl-0.5 lh" />
            </span>
          </button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute bottom-0 lg:right-0 md:right-0 right-0"
      >
        <div className="relative bg-white/10 backdrop-blur-md md:h-25 flex">
          <div className="flex flex-col md:h-full w-6 ">
            <button
              className="h-1/2 p-2 cursor-pointer hover:backdrop-blur-xl"
              onClick={next}
            >
              ›
            </button>
            <button
              className="h-1/2 p-2 cursor-pointer hover:backdrop-blur-xl"
              onClick={prev}
            >
              ‹
            </button>
          </div>

          <div className="lg:w-200 md:w-155 w-75 overflow-hidden py-2.5">
            <motion.div
              animate={{ x: -index * ITEM_WIDTH }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              onAnimationComplete={() => {
                setIsAnimating(false);

                if (index === total + 1) setIndex(1);
                if (index === 0) setIndex(total);
              }}
              className="flex gap-9"
            >
              {extended.map((item, idx) => (
                <motion.div
                  key={idx}
                  onClick={() => handleThumbnailClick(item, idx)}
                  whileHover={{ scale: 1.05 }}
                  className={`relative h-20 w-35 shrink-0 overflow-hidden rounded-sm transition
                ${
                  item.src === active.src
                    ? "scale-105 ring-2 ring-white"
                    : "opacity-70 hover:opacity-100"
                }`}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    priority
                    quality={75}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />

                  <div className="absolute bottom-0 left-0 w-full bg-black/40 px-2 py-1">
                    <p className="text-xs text-white truncate">{item.title}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
