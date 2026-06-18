import { prisma } from "@/lib/prisma";

export async function checkRateLimit(ip: string) {
  const windowMs = 60 * 1000;

  const count = await prisma.rateLimit.count({
    where: {
      ip,
      createdAt: {
        gte: new Date(Date.now() - windowMs),
      },
    },
  });

  return count < 5;
}

export async function logRateLimit(ip: string) {
  await prisma.rateLimit.create({
    data: {
      ip,
      action: "otp_request",
    },
  });
}
