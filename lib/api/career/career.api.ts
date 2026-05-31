import { prisma } from "@/lib/prisma";
import { JobWhereInput } from "@/types/type";
import { buildMeta } from "../pagination";
import { buildQuery } from "@/lib/query-builder";

export async function getJobs(searchParams: URLSearchParams) {
  const query = buildQuery<JobWhereInput>({
    searchParams,

    searchableFields: ["title"],

    filterableFields: {
      department: (value) => ({
        department: value,
      }),

      employmentType: (value) => ({
        employmentType: value,
      }),
    },

    sortableFields: ["createdAt"],
    defaultSort: "createdAt",
  });

  const [data, total] = await Promise.all([
    prisma.job.findMany({
      where: query.where,
      skip: query.skip,
      take: query.take,
      orderBy: query.orderBy,
      select: {
        id: true,
        title: true,
        slug: true,
        departement: true,
        description: true,
        shortDescription: true,
        postedAt: true,
        educationLevel: true,
        employmentType: true,
        salaryMin: true,
        salaryMax: true,
        deadline: true,
        experienceLevel: true,
        benefits: {
          select: {
            value: true,
          },
        },
        requirements: {
          select: {
            value: true,
          },
        },
        skills: {
          select: {
            skill: true,
          },
        },
        isUrgent: true,
      },
    }),

    prisma.job.count({ where: query.where }),
  ]);

  return {
    data,
    meta: buildMeta(total, query.page, query.limit),
  };
}
