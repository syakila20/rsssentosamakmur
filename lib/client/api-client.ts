import { ApiResponse } from "@/types/type";

export type ApiClientOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  params?: Record<string, string | number | undefined>;
  body?: unknown;
  headers?: HeadersInit;
  token?: string;
  cache?: RequestCache;
};

export async function apiClient<T>(
  endpoint: string,
  options?: ApiClientOptions,
): Promise<ApiResponse<T>> {
  const {
    method = "GET",
    params,
    body,
    headers,
    token,
    cache = "no-store",
  } = options || {};

  const query = params
    ? "?" +
      new URLSearchParams(
        Object.entries(params)
          .filter(([, v]) => v !== undefined && v !== "")
          .map(([k, v]) => [k, String(v)]),
      )
    : "";

  const res = await fetch(endpoint + query, {
    method,
    cache,

    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      // ...(token
      //   ? {
      //       Authorization: `Bearer ${token}`,
      //     }
      //   : {}),
      ...headers,
    },

    body: body ? JSON.stringify(body) : undefined,
  });

  const json = await res.json();

  if (!res.ok) {
    throw {
      message: json?.message || "API Error",
      status: res.status,
      data: json,
    };
  }

  return json;
}
