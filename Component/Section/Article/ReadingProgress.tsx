"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const scrollTop = window.scrollY;

      const height = document.body.scrollHeight - window.innerHeight;

      const progress = (scrollTop / height) * 100;

      setWidth(progress);
    };

    window.addEventListener("scroll", updateScroll);

    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-50 h-1 w-full bg-transparent">
      <div
        className="h-full bg-linear-to-r from-fuchsia-500 to-cyan-500 transition-all duration-100"
        style={{
          width: `${width}%`,
        }}
      />
    </div>
  );
}
