import { trackArticleView } from "@/lib/api/article/article.services";
import { nextApiErrorResponse, nextApiResponse } from "@/lib/api/next-response";
import { apiErrorResponse, apiResponse } from "@/lib/api/response";

export async function POST(req: Request) {
  try {
    const { slug, sessionId } = await req.json();

    if (!slug) {
      return nextApiErrorResponse("Failed to fetch article", {
        code: "FAILED_POST_VIEW",
        status: 404,
        details: "Post Need Slug Params",
      });
    }
    const ip =
      req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip");

    const userAgent = req.headers.get("user-agent");
    await trackArticleView(
      slug,
      sessionId,
      ip ?? undefined,
      userAgent ?? undefined,
    );

    return nextApiResponse(true, null);
  } catch (err) {
    return nextApiErrorResponse("Failed to fetch article", {
      code: "FAILED_POST_VIEW",
      status: 404,
      details: `Failed post tracking count view :${err}`,
    });
  }
}
