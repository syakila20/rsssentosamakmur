"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  title: string;
}

interface Props {
  toc: TocItem[];
}

export default function ArticleToc({ toc }: Props) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const headings = document.querySelectorAll("h2[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-120px 0px -70% 0px",
        threshold: 0,
      },
    );

    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h3 className="text-lg font-bold text-neutral-700 mb-5">Daftar Isi</h3>

      <ul className="relative border-l border-slate-200 space-y-3">
        {toc.map((item) => {
          const isActive = activeId === item.id;

          return (
            <li key={item.id} className="relative pl-4">
              {/* ACTIVE LINE */}
              <span
                className={`absolute -left-px top-0 h-full w-0.5 transition-colors duration-300 ${
                  isActive ? "bg-emerald-500" : "bg-transparent"
                }`}
              />

              <a
                href={`#${item.id}`}
                className={`block text-sm transition-colors duration-200 ${
                  isActive
                    ? "text-slate-700 font-medium"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
