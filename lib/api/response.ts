import { ApiMeta } from "@/types/type";

export function apiResponse<T>(
  data: T,
  meta: ApiMeta | null,
  message?: string,
) {
  return {
    success: true,
    data,
    meta,
    message: message,
    code: 200,
  };
}

export function apiErrorResponse(
  message: string,
  options?: {
    code?: string;
    status?: number;
    details?: unknown;
  },
) {
  return {
    success: false,
    message,
    code: options?.code,
    details: options?.details,
    status: options?.status ?? 500,
  };
}
