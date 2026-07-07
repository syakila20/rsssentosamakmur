import { prisma } from "@/lib/prisma";
import { CreateArticlePayload, UpdateArticlePayload } from "./type";
import { toSlug } from "@/lib/toSlug";

export async function createArticleRepository(
  authorId: number,
  payload: CreateArticlePayload,
) {
  return prisma.article.create({
    data: {
      title: payload.title,
      slug: toSlug(payload?.title),
      excerpt: payload.excerpt || "",
      thumbnail: payload.thumbnail,
      contentJson: payload.contentJson,
      thumbnailPublicId: payload?.thumbnailPublicId,
      content: payload.content || "",
      authorId,
      categoryId: payload.categoryId,
      tags: {
        create: payload.tagIds.map((tagId) => ({
          tagId,
        })),
      },
    },
  });
}

export async function updateArticleRepository(
  id: number,
  payload: UpdateArticlePayload,
) {
  return prisma.article.update({
    where: {
      id,
    },
    data: {
      title: payload.title,
      slug: toSlug(payload?.title || ""),
      excerpt: payload.excerpt || "",
      thumbnail: payload.thumbnail,
      thumbnailPublicId: payload?.thumbnailPublicId,
      contentJson: payload.contentJson,
      content: payload.content || "",
      categoryId: Number(payload.categoryId),
      tags: {
        deleteMany: {},
        create: payload?.tagIds?.map((tagId) => ({
          tagId,
        })),
      },
    },
  });
}

export async function findArticleByIdRepository(id: number) {
  return prisma.article.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      content: true,
      thumbnail: true,
      createdAt: true,
      contentJson: true,
      thumbnailPublicId: true,
      category: {
        select: {
          id: true,
          slug: true,
        },
      },
      tags: {
        select: {
          tag: true,
        },
      },
    },
  });
}

export async function findArticleBySlugRepository(slug: string) {
  return prisma.article.findFirst({
    where: {
      slug,
    },
  });
}

export async function publishArticleRepository(id: number, name: string) {
  return prisma.article.update({
    where: {
      id,
    },

    data: {
      published: true,
      publishedAt: new Date(),
      status: "PUBLISHED",
      reviewerName: name,
    },
  });
}

export async function deleteArticleRepository(id: number) {
  return prisma.article.update({
    where: {
      id,
    },

    data: {
      deletedAt: new Date(),
    },
  });
}

export async function restoreArticleRepository(id: number) {
  return prisma.article.update({
    where: {
      id,
    },

    data: {
      deletedAt: null,
    },
  });
}

export async function autosaveArticleRepository(
  id: number,
  payload: UpdateArticlePayload,
) {
  return prisma.article.update({
    where: {
      id,
    },

    data: payload,
  });
}
