import { getPopularArticles } from "@/lib/api/article/article.services";
import { apiErrorResponse, apiResponse } from "@/lib/api/response";

export async function GET() {
  try {
    const articles = await getPopularArticles(5);

    return apiResponse(articles, null);
  } catch (err) {
    return apiErrorResponse("Failed get popular articles", {
      code: "POPULAR_ARTICLE_FAILED",
      status: 500,
      details: String(err),
    });
  }
}
