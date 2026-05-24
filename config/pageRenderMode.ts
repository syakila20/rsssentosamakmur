export type RenderMode = "dynamic" | "static";

export interface PageRenderConfig {
  dynamic?: boolean;
  revalidate?: number;
}

export const renderMode = {
  dynamic: {
    dynamic: true,
    revalidate: 0,
  },

  static: {
    revalidate: 60,
  },
} as const satisfies Record<RenderMode, PageRenderConfig>;
