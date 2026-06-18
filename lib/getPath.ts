/* eslint-disable react-hooks/rules-of-hooks */
import { usePathname } from "next/navigation";

export const getLastPathname = () => {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  // cek apakah segment pertama adalah locale

  // hapus locale kalau ada
  const cleanSegments = segments;

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

export function useCurrentRoute() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  const root = segments[0] ?? "";
  const modules = segments[1] ?? "";
  const action = segments[2] ?? "";
  const slug = segments[3] ?? "";

  return {
    pathname,
    segments,

    root,
    modules,
    action,
    slug,

    isList: segments.length === 2,
    isCreate: action === "create",
    isEdit: action === "edit",
    isDetail: Boolean(slug),
  };
}
