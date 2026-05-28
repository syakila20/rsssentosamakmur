import { apiClient } from "../client/api-client";

export const http = {
  get: <T>(url: string, params?: Record<string, unknown>, token?: string) =>
    apiClient<T>(url, {
      method: "GET",
      params: params as Record<string, string | number | undefined>,
      token,
    }),

  post: <T>(url: string, body?: unknown, token?: string) =>
    apiClient<T>(url, {
      method: "POST",
      body,
      token,
    }),

  put: <T>(url: string, body?: unknown, token?: string) =>
    apiClient<T>(url, {
      method: "PUT",
      body,
      token,
    }),

  patch: <T>(url: string, body?: unknown, token?: string) =>
    apiClient<T>(url, {
      method: "PATCH",
      body,
      token,
    }),

  delete: <T>(url: string, token?: string) =>
    apiClient<T>(url, {
      method: "DELETE",
      token,
    }),
};
