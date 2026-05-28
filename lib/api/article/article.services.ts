import { prisma } from "@/lib/prisma";
import { buildMeta } from "@/lib/api/pagination";
import { buildQuery } from "@/lib/query-builder";

export async function getArticleCategories() {
  const categories = await prisma.category.findMany({
    where: {},

    select: {
      name: true,
      slug: true,
      id: true,
    },
  });

  return categories.map((c) => ({
    label: c.name,
    value: c?.slug,
  }));
}

export async function getArticles(searchParams: URLSearchParams) {
  const query = buildQuery({
    searchParams,
    searchableFields: ["title", "excerpt"],
    filterableFields: {
      category: (value) => ({
        category: {
          slug: value,
        },
      }),
    },
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
        categoryId: true,
        articleViews: true,
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
        author: {
          select: {
            name: true,
          },
        },
        thumbnail: true,
        publishedAt: true,
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

export const trackArticleView = async (
  slug: string,
  sessionId: string,
  ip?: string,
  userAgent?: string,
) => {
  const article = await prisma.article.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (!article) return;

  const exists = await prisma.articleView.findFirst({
    where: {
      articleId: article.id,
      sessionId,
    },
  });

  if (exists) return;

  await prisma.articleView.create({
    data: {
      articleId: article.id,
      sessionId,
      ipAddress: ip,
      userAgent,
    },
  });
};

export async function getPopularArticles(limit = 5) {
  return prisma.article.findMany({
    where: {
      published: true,
    },

    orderBy: {
      views: "desc",
    },

    take: limit,

    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      thumbnail: true,
      category: true,
      views: true,
      createdAt: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });
}

export async function getRelatedArticles(
  category: string,
  currentSlug: string,
) {
  return prisma.article.findMany({
    where: {
      published: true,

      // categoryId: 1,
      category: {
        slug: category,
      },

      slug: {
        not: currentSlug,
      },
    },

    take: 4,

    orderBy: {
      views: "desc",
    },

    select: {
      id: true,
      title: true,
      slug: true,
      thumbnail: true,
      createdAt: true,
      category: true,
    },
  });
}
