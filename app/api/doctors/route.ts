import { getDoctors } from "@/lib/api/doctor/doctors.service";
import { nextApiErrorResponse, nextApiResponse } from "@/lib/api/next-response";
import { apiErrorResponse, apiResponse } from "@/lib/api/response";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const result = await getDoctors(searchParams);
    return nextApiResponse(result.data, result.meta);
  } catch (err) {
    return nextApiErrorResponse("Failed to fetch articles");
  }
}
