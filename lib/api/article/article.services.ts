import { prisma } from "@/lib/prisma";
import { buildMeta } from "@/lib/api/pagination";
import { buildQuery } from "@/lib/query-builder";

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

export async function getArticles(searchParams: URLSearchParams) {
  const query = buildQuery({
    searchParams,
    searchableFields: ["title", "excerpt"],
    filterableFields: ["category"],
    sortableFields: ["createdAt"],
    defaultSort: "createdAt",
  });

  const where = {
    ...query.where,
    published: true,
  };

  const [data, total] = await Promise.all([
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
    prisma.article.count({ where }),
  ]);

  return {
    data,
    meta: buildMeta(query.page, query.limit, total),
  };
}
export async function getArticleBySlug(slug: string) {
  const article = await prisma.article.findFirst({
    where: {
      slug,
      published: true,
    },

    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      content: true,
      category: true,
      thumbnail: true,
      createdAt: true,
      author: {
        select: {
          avatar: true,
          name: true,
        },
      },
    },
  });

  if (!article) {
    throw new Error("ARTICLE_NOT_FOUND");
  }

  return article;
}
