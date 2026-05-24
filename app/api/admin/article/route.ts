import { NextResponse } from "next/server";
import { requirePermission } from "@/lib/guard";
import { prisma } from "@/lib/prisma";

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
