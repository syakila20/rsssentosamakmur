// // import { baseFetcher } from "./base";

// import { ApiResponse } from "@/types/type";
// import { baseFetcher } from "./base";

// export async function fetchPaginated<T>(
//   endpoint: string,
//   params?: Record<string, string | number | undefined>,
// ): Promise<ApiResponse<T[]>> {
//   const query = new URLSearchParams();

//   Object.entries(params || {}).forEach(([k, v]) => {
//     if (v !== undefined && v !== "") {
//       query.set(k, String(v));
//     }
//   });

//   return baseFetcher(`${endpoint}?${query.toString()}`);
// }
import { ApiResponse } from "@/types/type";
import { apiClient } from "./client/api-client";

export async function fetchPaginated<T>(
  endpoint: string,
  params?: Record<string, string | number | undefined>,
): Promise<ApiResponse<T[]>> {
  return apiClient<T[]>(endpoint, {
    method: "GET",
    params,
  });
}
