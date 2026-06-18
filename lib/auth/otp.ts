// import { prisma } from "@/lib/prisma";
// import bcrypt from "bcryptjs";

// const OTP_EXPIRY_MINUTES = 5;

// export function generateOtp() {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// }

// export async function createOtp(email: string) {
//   const otp = generateOtp();
//   const hash = await bcrypt.hash(otp, 10);

//   const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

//   const record = await prisma.loginOtp.create({
//     data: {
//       email,
//       codeHash: hash,
//       expiresAt,
//     },
//   });

//   return { otp, record };
// }
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const OTP_EXPIRY_MINUTES = 5;

export function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function createOtp(email: string) {
  const cleanEmail = email.trim().toLowerCase();

  const otp = generateOtp();
  const codeHash = await bcrypt.hash(otp, 10);

  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

  const record = await prisma.$transaction(async (tx) => {
    await tx.loginOtp.deleteMany({
      where: {
        email: cleanEmail,
      },
    });

    return tx.loginOtp.create({
      data: {
        email: cleanEmail,
        codeHash,
        expiresAt,
      },
    });
  });

  return {
    otp,
    sessionId: record.id,
    expiresAt: record.expiresAt,
  };
}
