import { apiErrorResponse, apiResponse } from "@/lib/api/response";
import { createOtp } from "@/lib/auth/otp";
import { sendOtpEmail } from "@/lib/email";
import { checkRateLimit, logRateLimit } from "@/lib/security/ratelimit";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return apiErrorResponse("Email is required", {
        status: 400,
        code: "EMAIL_REQUIRED",
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

    const allowed = await checkRateLimit(ip);

    if (!allowed) {
      return apiErrorResponse("Too many requests", {
        status: 429,
        code: "RATE_LIMIT",
      });
    }

    await logRateLimit(ip);

    const { otp, sessionId } = await createOtp(cleanEmail);

    await sendOtpEmail(cleanEmail, otp);

    const response = apiResponse(
      {
        expiresIn: 300,
      },
      null,
      "OTP Successfully Send",
    );

    response.cookies.set("otp_session", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 300,
    });

    return response;
  } catch (error) {
    console.error("SEND_OTP_ERROR", error);

    return apiErrorResponse("Internal Server Error", {
      status: 500,
      code: "INTERNAL_ERROR",
    });
  }
}
