import { sendOtpEmail } from "@/lib/email";

export async function GET() {
  await sendOtpEmail("test@gmail.com", "123456");

  return Response.json({ ok: true });
}
