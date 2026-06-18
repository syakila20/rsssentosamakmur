import SvgArrow from "@/Icon/Arrow";
import SvgArticle from "@/Icon/Article";
import SvgDashboard from "@/Icon/Dashboard";
import SvgDoctor from "@/Icon/Doctor";
import SvgUsers from "@/Icon/User";
import { ComponentType } from "react";

// config/sidebar-menu.ts
export type IUserRole = "ADMIN" | "STAFF" | "USER";
export interface ISidebarMenu {
  label: string;
  path?: string;
  icon: ComponentType<{ className?: string }>;
  permissions?: string[];
  children?: SidebarMenuChild[];
}

export interface SidebarMenuChild {
  label: string;
  path: string;
  permissions?: string[];
}

export const SIDEBAR_MENU: ISidebarMenu[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: SvgDashboard,
  },

  {
    label: "Artikel",
    icon: SvgArticle,
    permissions: ["article.read"],
    path: "/cms/article",
  },

  {
    label: "Dokter",
    icon: SvgDoctor,
    permissions: ["doctor.read"],
    path: "/cms/doctor",
  },

  {
    label: "Promo MCU",
    icon: SvgArrow,
    permissions: ["promo.read"],
    path: "/admin/promos",
  },

  {
    label: "Master Data",
    icon: SvgArrow,
    permissions: ["user.read"],
    children: [
      {
        label: "Daftar User",
        path: "/admin/users",
        permissions: ["user.read"],
      },
    ],
  },
];
// utils/isActive.ts
export function isActivePath(currentPath: string, targetPath?: string) {
  if (!targetPath) return false;
  return currentPath === targetPath || currentPath.startsWith(targetPath + "/");
}
