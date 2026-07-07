// "use server";

// import { requirePermission } from "@/lib/auth/require-permission";
// import { toSlug } from "@/lib/toSlug";

// import { articleRepository } from "./article.repository";
// import { CreateArticlePayload, UpdateArticlePayload } from "./type";

// export const articleService = {
//   async create(payload: CreateArticlePayload) {
//     const user = await requirePermission("article.create");
//     return articleRepository.create(user.id, payload);
//   },

//   async update(id: number, payload: UpdateArticlePayload) {
//     await requirePermission("article.update");

//     return articleRepository.update(id, payload);
//   },

//   async getById(id: number) {
//     await requirePermission("article.read");

//     return articleRepository.findById(id);
//   },

//   async getBySlug(slug: string) {
//     await requirePermission("article.read");

//     return articleRepository.findBySlug(slug);
//   },

//   async publish(id: number) {
//     await requirePermission("article.update");

//     return articleRepository.publish(id);
//   },

//   async delete(id: number) {
//     await requirePermission("article.delete");

//     return articleRepository.delete(id);
//   },

//   async restore(id: number) {
//     await requirePermission("article.update");

//     return articleRepository.restore(id);
//   },

//   async autosaveDraft(id: number, payload: UpdateArticlePayload) {
//     await requirePermission("article.update");

//     return articleRepository.autosaveDraft(id, payload);
//   },
// };
import { requirePermission } from "@/lib/auth/require-permission";

import {
  createArticleRepository,
  updateArticleRepository,
  findArticleByIdRepository,
  findArticleBySlugRepository,
  publishArticleRepository,
  deleteArticleRepository,
  restoreArticleRepository,
  autosaveArticleRepository,
} from "./article.repository";

import { CreateArticlePayload, UpdateArticlePayload } from "./type";

export async function createArticle(payload: CreateArticlePayload) {
  const user = await requirePermission("article.create");

  return createArticleRepository(user.id, payload);
}

export async function updateArticle(id: number, payload: UpdateArticlePayload) {
  await requirePermission("article.update");

  return updateArticleRepository(id, payload);
}

export async function getArticleById(id: number) {
  await requirePermission("article.read");
  return findArticleByIdRepository(id);
}

export async function getArticleBySlug(slug: string) {
  await requirePermission("article.read");

  return findArticleBySlugRepository(slug);
}

export async function publishArticle(id: number) {
  const user = await requirePermission("article.create");
  await requirePermission("article.approved");

  return publishArticleRepository(id, user?.name);
}

export async function deleteArticle(id: number) {
  await requirePermission("article.delete");

  return deleteArticleRepository(id);
}

export async function restoreArticle(id: number) {
  await requirePermission("article.update");

  return restoreArticleRepository(id);
}

export async function autosaveArticle(
  id: number,
  payload: UpdateArticlePayload,
) {
  await requirePermission("article.update");

  return autosaveArticleRepository(id, payload);
}
