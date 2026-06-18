import { ComponentType } from "react";

export const ICON_MAP: Record<
  IconKey,
  ComponentType<{ className?: string }>
> = {
  dashboard: SvgDashboard,
  article: SvgArticle,
  management: SvgManagement,
  users: SvgUsers,
  settings: SvgSettings,
};