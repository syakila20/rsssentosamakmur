import { usePathname } from "next/navigation";

export function isChildActive(pathname: string, children?: { path: string }[]) {
  return children?.some((c) => pathname.startsWith(c.path));
}

export function isExactActive(pathname: string, path?: string) {
  if (!path) return false;
  return pathname === path;
}

export function isParentActive(pathname: string, path?: string) {
  if (!path) return false;
  return pathname.startsWith(path + "/");
}
