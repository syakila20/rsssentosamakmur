"use client";

import { useEffect, useState } from "react";

interface MediaQueryResult {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export function useMediaQuery(): MediaQueryResult {
  const [breakpoints, setBreakpoints] = useState<MediaQueryResult>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  useEffect(() => {
    const mobileMQ = window.matchMedia("(max-width: 768px)");
    const tabletMQ = window.matchMedia(
      "(min-width: 769px) and (max-width: 1024px)",
    );
    const desktopMQ = window.matchMedia("(min-width: 1025px)");

    const handler = () => {
      setBreakpoints({
        isMobile: mobileMQ.matches,
        isTablet: tabletMQ.matches,
        isDesktop: desktopMQ.matches,
      });
    };

    handler(); // initial check

    mobileMQ.addEventListener("change", handler);
    tabletMQ.addEventListener("change", handler);
    desktopMQ.addEventListener("change", handler);

    return () => {
      mobileMQ.removeEventListener("change", handler);
      tabletMQ.removeEventListener("change", handler);
      desktopMQ.removeEventListener("change", handler);
    };
  }, []);

  return breakpoints;
}
