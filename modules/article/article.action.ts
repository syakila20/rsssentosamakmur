"use server";

import { apiErrorResponse, apiResponse } from "@/lib/api/response";
import {
  createArticle,
  updateArticle,
  getArticleById,
  getArticleBySlug,
  publishArticle,
  deleteArticle,
  restoreArticle,
  autosaveArticle,
} from "./article.service";

import { CreateArticlePayload, UpdateArticlePayload } from "./type";

export async function createArticleAction(payload: CreateArticlePayload) {
  try {
    const article = await createArticle(payload);

    return apiResponse(article, null, "Artikel berhasil dibuat");
  } catch (error) {
    return apiErrorResponse(
      error instanceof Error ? error.message : "Terjadi kesalahan",
    );
  }
}

export async function updateArticleAction(
  id: number,
  payload: UpdateArticlePayload,
) {
  try {
    const article = await updateArticle(id, payload);

    return apiResponse(article, null, "Artikel berhasil diperbarui");
  } catch (error) {
    return apiErrorResponse(
      error instanceof Error ? error.message : "Terjadi kesalahan",
    );
  }
}

export async function getArticleByIdAction(id: number) {
  return getArticleById(id);
}

export async function getArticleBySlugAction(slug: string) {
  return getArticleBySlug(slug);
}

export async function publishArticleAction(id: number) {
  return publishArticle(id);
}

export async function deleteArticleAction(id: number) {
  return deleteArticle(id);
}

export async function restoreArticleAction(id: number) {
  return restoreArticle(id);
}

export async function autosaveArticleAction(
  id: number,
  payload: Partial<UpdateArticlePayload>,
) {
  try {
    const article = await autosaveArticle(id, payload);

    return apiResponse(article, null, "Draft berhasil disimpan");
  } catch (error) {
    return apiErrorResponse(
      error instanceof Error ? error.message : "Terjadi kesalahan",
    );
  }
}
