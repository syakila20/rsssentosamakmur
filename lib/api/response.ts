import { ApiMeta } from "@/types/type";
import { NextResponse } from "next/server";

export function apiResponse<T>(
  data: T,
  meta: ApiMeta | null,
  message?: string,
) {
  return NextResponse.json(
    {
      success: true,
      data,
      meta,
      message: message,
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
  return NextResponse.json(
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
