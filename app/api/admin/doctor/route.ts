import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/auth/require-permission";

export async function POST(req: Request) {
  try {
    await requirePermission("doctor.create");

    const body = await req.json();

    const data = await prisma.doctor.create({
      data: body,
    });

    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 403 });
  }
}
