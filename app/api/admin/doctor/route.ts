import { NextResponse } from "next/server";
import { requirePermission } from "@/lib/guard";
import { prisma } from "@/lib/prisma";

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
