// import { prisma } from "@/lib/prisma";
// import { CreateArticlePayload, UpdateArticlePayload } from "./type";
// import { toSlug } from "@/lib/toSlug";

// export const articleRepository = {
//   create(authorId: number, payload: CreateArticlePayload) {
//     return prisma.article.create({
//       data: {
//         title: payload.title,
//         slug: toSlug(payload?.title),
//         excerpt: payload.excerpt || "",
//         thumbnail: payload.thumbnail,
//         contentJson: payload.contentJson,
//         content: payload.content || "",
//         authorId,
//         categoryId: payload.categoryId,
//         tags: {
//           create: payload.tagIds.map((tagId) => ({
//             tagId,
//           })),
//         },
//       },
//     });
//   },

//   update(articleId: number, payload: UpdateArticlePayload) {
//     return prisma.article.update({
//       where: {
//         id: articleId,
//       },
//       data: {
//         title: payload.title,
//         excerpt: payload.excerpt,
//         thumbnail: payload.thumbnail,
//         contentJson: payload.contentJson,
//         content: payload.content,
//         categoryId: payload.categoryId,
//       },
//     });
//   },

//   findById(id: number) {
//     return prisma.article.findUnique({
//       where: {
//         id,
//       },

//       include: {
//         category: true,
//         author: true,

//         tags: {
//           include: {
//             tag: true,
//           },
//         },
//       },
//     });
//   },

//   findBySlug(slug: string) {
//     return prisma.article.findFirst({
//       where: {
//         slug,
//       },
//     });
//   },

//   publish(id: number) {
//     return prisma.article.update({
//       where: {
//         id,
//       },

//       data: {
//         status: "PUBLISHED",
//         publishedAt: new Date(),
//       },
//     });
//   },

//   delete(id: number) {
//     return prisma.article.update({
//       where: {
//         id,
//       },

//       data: {
//         deletedAt: new Date(),
//       },
//     });
//   },

//   restore(id: number) {
//     return prisma.article.update({
//       where: {
//         id,
//       },

//       data: {
//         deletedAt: null,
//       },
//     });
//   },

//   autosaveDraft(id: number, payload: UpdateArticlePayload) {
//     return prisma.article.update({
//       where: {
//         id,
//       },

//       data: {
//         title: payload.title,
//         excerpt: payload.excerpt,
//         thumbnail: payload.thumbnail,
//         contentJson: payload.contentJson,
//         content: payload.content,
//         categoryId: payload.categoryId,
//         updatedAt: new Date(),
//       },
//     });
//   },
// };
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

export async function publishArticleRepository(id: number) {
  return prisma.article.update({
    where: {
      id,
    },

    data: {
      published: true,
      publishedAt: new Date(),
      status: "PUBLISHED",
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
