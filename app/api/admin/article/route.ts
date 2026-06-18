import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/auth/require-permission";

export async function POST(req: Request) {
  try {
    const session = await requirePermission("article.create");

    const body = await req.json();

    const data = await prisma.article.create({
      data: {
        ...body,
        authorId: session.user.id,
      },
    });

    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json(
      { message: e.message },
      { status: e.message === "UNAUTHORIZED" ? 401 : 403 },
    );
  }
}
