// import { baseFetcher } from "./base";

import { baseFetcher } from "./base";

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type PaginatedResponse<T> = {
  data: T[];
  meta: PaginationMeta;
};

// export async function fetchPaginated<T>(
//   endpoint: string,
//   params?: Record<string, string | number | undefined>,
// ) {
//   const query = new URLSearchParams();

//   Object.entries(params || {}).forEach(([key, value]) => {
//     if (value !== undefined && value !== "") {
//       query.set(key, String(value));
//     }
//   });

//   const qs = query.toString();

//   const url = `/${endpoint}${qs ? `?${qs}` : ""}`;

//   return baseFetcher<PaginatedResponse<T>>(url);
// }
export async function fetchPaginated<T>(
  endpoint: string,
  params?: Record<string, string | number | undefined>,
) {
  const query = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      query.set(key, String(value));
    }
  });

  const qs = query.toString();

  const url = `/${endpoint}${qs ? `?${qs}` : ""}`;

  return baseFetcher<PaginatedResponse<T>>(url);
}
