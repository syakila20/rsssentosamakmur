import { prisma } from "@/lib/prisma";
import { buildQuery } from "@/lib/api/query-builder";
import { buildMeta } from "@/lib/api/pagination";
import { NextResponse } from "next/server";

export async function getArticles(searchParams: URLSearchParams) {
  const query = buildQuery({
    searchParams,
    searchableFields: ["title", "excerpt"],
    filterableFields: ["category"],
    sortableFields: ["createdAt", "title"],
    defaultSort: "createdAt",
  });

  const where = {
    ...query.where,
    published: true,
  };

  const [articles, total] = await Promise.all([
    prisma.article.findMany({
      where,
      skip: query.skip,
      take: query.take,
      orderBy: query.orderBy,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        category: true,
        thumbnail: true,
        createdAt: true,
      },
    }),

    prisma.article.count({
      where,
    }),
  ]);

  return {
    data: articles,
    meta: buildMeta(total, query.page, query.limit),
  };
}

export async function getArticleCategories() {
  const categories = await prisma.article.findMany({
    where: {
      published: true,

      category: {
        not: "",
      },
    },

    distinct: ["category"],

    select: {
      category: true,
    },
  });

  return categories.map((c) => ({
    label: c.category,

    value: c.category,
  }));
}

export async function GET() {
  const categories = await getArticleCategories();

  return NextResponse.json({
    success: true,

    data: categories,

    meta: {},
  });
}
