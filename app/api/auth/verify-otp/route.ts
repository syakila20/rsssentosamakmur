import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { randomBytes } from "crypto";

import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { code } = await req.json();

  const cookieStore = await cookies();

  const otpSessionId = cookieStore.get("otp_session")?.value;

  if (!otpSessionId) {
    return NextResponse.json(
      {
        message: "OTP session tidak ditemukan",
      },
      {
        status: 401,
      },
    );
  }

  const otpSession = await prisma.loginOtp.findUnique({
    where: {
      id: otpSessionId,
    },
  });

  if (!otpSession) {
    return NextResponse.json(
      {
        message: "OTP session tidak valid",
      },
      {
        status: 401,
      },
    );
  }

  if (otpSession.usedAt) {
    return NextResponse.json(
      {
        message: "OTP sudah digunakan",
      },
      {
        status: 400,
      },
    );
  }

  if (otpSession.expiresAt < new Date()) {
    return NextResponse.json(
      {
        message: "OTP expired",
      },
      {
        status: 400,
      },
    );
  }

  const valid = await bcrypt.compare(code, otpSession.codeHash);

  if (!valid) {
    return NextResponse.json(
      {
        message: "OTP salah",
      },
      {
        status: 400,
      },
    );
  }

  let user = await prisma.user.findUnique({
    where: {
      email: otpSession.email,
    },
  });

  let isNewUser = false;

  if (!user) {
    isNewUser = true;

    user = await prisma.user.create({
      data: {
        email: otpSession.email,
        name: otpSession.email.split("@")[0],
      },
    });
  }

  if (!user.isActive) {
    return NextResponse.json(
      {
        message: "Akun dinonaktifkan",
      },
      {
        status: 403,
      },
    );
  }

  await prisma.session.deleteMany({
    where: {
      userId: user.id,
    },
  });

  const sessionToken = randomBytes(32).toString("hex");

  await prisma.session.create({
    data: {
      sessionToken,

      userId: user.id,

      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    },
  });

  await prisma.loginOtp.update({
    where: {
      id: otpSession.id,
    },
    data: {
      usedAt: new Date(),
    },
  });

  const response = NextResponse.json({
    success: true,
  });

  response.cookies.set("session", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",

    sameSite: "lax",

    path: "/",

    maxAge: 60 * 60 * 24 * 7,
  });

  response.cookies.set("otp_session", "", {
    path: "/",
    maxAge: 0,
  });

  return response;
}
