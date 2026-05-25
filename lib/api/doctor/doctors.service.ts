import { prisma } from "@/lib/prisma";
import { buildMeta } from "@/lib/api/pagination";
import { buildQuery } from "@/lib/query-builder";

export async function getDoctors(searchParams: URLSearchParams) {
  const query = buildQuery({
    searchParams,
    searchableFields: ["title", "excerpt"],
    filterableFields: ["category"],
    sortableFields: ["createdAt"],
    defaultSort: "createdAt",
  });

  const where = {
    ...query.where,
    isActive: true,
  };

  const [data, total] = await Promise.all([
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
    prisma.doctor.count({ where }),
  ]);

  return {
    data,
    meta: buildMeta(query.page, query.limit, total),
  };
}
