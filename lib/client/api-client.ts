export type FetchOptions = {
  params?: Record<string, string | number | undefined>;
  cache?: RequestCache;
};

function buildQuery(params?: FetchOptions["params"]) {
  const query = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      query.set(key, String(value));
    }
  });

  const qs = query.toString();
  return qs ? `?${qs}` : "";
}

export async function apiClient<T>(
  endpoint: string,
  options?: FetchOptions,
): Promise<T> {
  const baseUrl =
    typeof window === "undefined"
      ? process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      : "";

  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${baseUrl}${cleanEndpoint}` + buildQuery(options?.params);

  const res = await fetch(url, {
    cache: options?.cache || "no-store",
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`);
  }

  return res.json();
}
