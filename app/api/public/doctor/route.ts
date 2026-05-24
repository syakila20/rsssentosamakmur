import { prisma } from "@/lib/prisma";
import { buildQuery } from "@/lib/api/query-builder";
import { buildMeta } from "@/lib/api/pagination";
import { apiResponse } from "@/lib/api/response";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = buildQuery({
    searchParams,
    searchableFields: ["name", "location"],
    filterableFields: ["specialtyId"],
    sortableFields: ["createdAt", "rating"],
    defaultSort: "createdAt",
  });

  const where = {
    ...query.where,
    isActive: true,
  };

  const [articles, total] = await Promise.all([
    prisma.doctor.findMany({
      where,
      skip: query.skip,
      take: query.take,
      orderBy: query.orderBy,

      select: {
        id: true,
        name: true,
        slug: true,
        image: true,
        location: true,
        rating: true,

        specialty: {
          select: {
            label: true,
            slug: true,
          },
        },
        isOnline: true,

        schedules: {
          select: {
            day: true,
            endTime: true,
            startTime: true,
          },
        },
      },
    }),

    prisma.doctor.count({
      where,
    }),
  ]);

  return apiResponse(articles, buildMeta(total, query.page, query.limit));
}
