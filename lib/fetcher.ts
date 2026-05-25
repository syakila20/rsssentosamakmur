// import { baseFetcher } from "./base";

import { ApiResponse } from "@/types/type";
import { baseFetcher } from "./base";

export async function fetchPaginated<T>(
  endpoint: string,
  params?: Record<string, string | number | undefined>,
): Promise<ApiResponse<T[]>> {
  const query = new URLSearchParams();

  Object.entries(params || {}).forEach(([k, v]) => {
    if (v !== undefined && v !== "") {
      query.set(k, String(v));
    }
  });

  return baseFetcher(`${endpoint}?${query.toString()}`);
}
