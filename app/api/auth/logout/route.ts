import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const cookieStore = await cookies();

  const sessionToken = cookieStore.get("session")?.value;

  if (sessionToken) {
    await prisma.session.deleteMany({
      where: {
        sessionToken,
      },
    });
  }

  cookieStore.delete("session");

  return Response.json({
    success: true,
  });
}
