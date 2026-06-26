import { getPopularArticles } from "@/lib/api/article/article.services";
import { nextApiErrorResponse, nextApiResponse } from "@/lib/api/next-response";
import { apiErrorResponse, apiResponse } from "@/lib/api/response";

export async function GET() {
  try {
    const articles = await getPopularArticles(5);

    return nextApiResponse(articles, null);
  } catch (err) {
    return nextApiErrorResponse("Failed get popular articles", {
      code: "POPULAR_ARTICLE_FAILED",
      status: 500,
      details: String(err),
    });
  }
}
