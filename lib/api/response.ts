import { ApiMeta } from "@/types/type";

export function apiResponse<T>(data: T, meta: ApiMeta | null) {
  return Response.json(
    {
      success: true,
      data,
      meta,
    },
    {
      status: 200,
    },
  );
}

export function apiErrorResponse(
  message: string,
  options?: {
    code?: string;
    status?: number;
    details?: unknown;
  },
) {
  return Response.json(
    {
      success: false,
      message,
      code: options?.code,
      details: options?.details,
    },
    {
      status: options?.status ?? 500,
    },
  );
}
