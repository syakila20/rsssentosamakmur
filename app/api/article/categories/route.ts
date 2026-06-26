import { getArticleCategories } from "@/lib/api/article/article.services";
import { NextResponse } from "next/server";

export async function GET() {
  const categories = await getArticleCategories(false);

  return NextResponse.json({
    success: true,
    data: categories,
    meta: {},
  });
}
