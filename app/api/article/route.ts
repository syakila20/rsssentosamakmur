import { getArticles } from "@/lib/api/article/article.services";
import { apiErrorResponse, apiResponse } from "@/lib/api/response";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const result = await getArticles(searchParams);

    return apiResponse(result.data, result.meta);
  } catch (err) {
    return apiErrorResponse("Failed to fetch article", {
      code: "FAILED_GET_ARTICLE",
      status: 404,
      details: err,
    });
  }
}
