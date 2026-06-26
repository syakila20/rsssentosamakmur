import { apiErrorResponse, apiResponse } from "@/lib/api/response";

import { getArticleBySlug } from "@/lib/api/article/article.services";
import { nextApiErrorResponse, nextApiResponse } from "@/lib/api/next-response";

interface Params {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(req: Request, { params }: Params) {
  try {
    const { slug } = await params;

    const article = await getArticleBySlug(slug);

    return nextApiResponse(article, null);
  } catch (error) {
    return nextApiErrorResponse("Failed get articles", {
      status: 500,
      details: error,
    });
  }
}
