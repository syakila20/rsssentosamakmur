import { ApiError, ApiMeta, ApiResponse } from "@/types/type";

export function apiResponse<T>(data: T, meta: ApiMeta | null) {
  return Response.json({
    success: true,
    data,
    meta,
  });
}
export function apiErrorResponse(
  message: string,
  options?: {
    code?: string;
    status?: number;
    details?: unknown;
  },
): ApiError {
  return {
    success: false,
    message,
    code: options?.code,
    status: options?.status,
    details: options?.details,
  };
}
