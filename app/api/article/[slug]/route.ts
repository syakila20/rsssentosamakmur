import { apiErrorResponse, apiResponse } from "@/lib/api/response";

import { getArticleBySlug } from "@/lib/api/article/article.services";

interface Params {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(req: Request, { params }: Params) {
  try {
    const { slug } = await params;

    const article = await getArticleBySlug(slug);

    return Response.json(apiResponse(article, null));
  } catch (err) {
    return Response.json(
      apiErrorResponse("Failed to fetch article", {
        code: "ARTICLE_DETAIL_FAILED",
        status: 404,
        details: err,
      }),
      {
        status: 404,
      },
    );
  }
}
