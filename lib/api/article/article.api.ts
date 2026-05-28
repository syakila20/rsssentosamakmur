import { apiClient } from "@/lib/client/api-client";
import { fetchPaginated } from "@/lib/fetcher";

export const articleApi = {
  //   getAll: (params?: Record<string, string | number>) =>
  //     fetchPaginated("/api/article", params),

  //   getBySlug: (slug: string) => apiClient(`/api/article/${slug}`),

  trackView: (slug: string, sessionId: string) =>
    apiClient("/api/article/view", {
      method: "POST",
      body: {
        slug,
        sessionId,
      },
    }),
};
