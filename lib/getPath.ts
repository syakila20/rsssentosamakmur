/* eslint-disable react-hooks/rules-of-hooks */
import { usePathname } from "next/navigation";

const LOCALES = ["id", "en"]; // sesuaikan dengan project kamu

export const getLastPathname = () => {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  // cek apakah segment pertama adalah locale
  const isLocale = LOCALES.includes(segments[0]);

  // hapus locale kalau ada
  const cleanSegments = isLocale ? segments.slice(1) : segments;

  return {
    lastOfPath: cleanSegments[cleanSegments.length - 1] || "",
    secondOfPath: cleanSegments[0] || "",
  };
};

export const isActivePath = (currentPath: string, targetPath?: string) => {
  if (!targetPath) return false;
  return currentPath === targetPath || currentPath.startsWith(targetPath + "/");
};

export const formatStringCapital = (str: string) => {
  const split = str?.split("-");
  return split
    ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
