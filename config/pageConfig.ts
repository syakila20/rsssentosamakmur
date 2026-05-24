import { renderMode } from "./pageRenderMode";

export const pageConfig = {
  article: renderMode.dynamic,
  doctor: renderMode.dynamic,
  home: renderMode.static,
} as const satisfies Record<
  string,
  {
    dynamic?: string;
    revalidate?: number;
  }
>;
