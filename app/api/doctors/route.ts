import { getDoctors } from "@/lib/api/doctor/doctors.service";
import { apiErrorResponse, apiResponse } from "@/lib/api/response";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const result = await getDoctors(searchParams);
    return apiResponse(result.data, result.meta);
  } catch (err) {
    return apiErrorResponse("Failed to fetch articles");
  }
}
