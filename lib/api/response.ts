import { NextResponse } from "next/server";

export function apiResponse(
  data: unknown,

  meta?: {
    total: number;
    page: number;
    limit: number;
  },
) {
  return NextResponse.json({
    success: true,
    data,

    meta: meta && {
      ...meta,

      totalPages: Math.ceil(meta.total / meta.limit),
    },
  });
}
