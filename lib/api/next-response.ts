import { NextResponse } from "next/server";
import { apiErrorResponse, apiResponse } from "./response";
import { ApiMeta } from "@/types/type";

export function nextApiResponse<T>(
  data: T,
  meta?: ApiMeta | null,
  message?: string,
) {
  return NextResponse.json(apiResponse(data, meta || null, message), {
    status: 200,
  });
}

export function nextApiErrorResponse(
  message: string,
  options?: {
    code?: string;
    status?: number;
    details?: unknown;
  },
) {
  return NextResponse.json(apiErrorResponse(message, options), {
    status: options?.status ?? 500,
  });
}
