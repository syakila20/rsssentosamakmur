/* eslint-disable @typescript-eslint/no-explicit-any */
import { can } from "@/lib/auth/rbac";
import { articleRepository } from "./article.repository";

export const articleService = {
  async create(user: any, payload: any) {
    if (!can(user.permissions, "article.create")) {
      throw new Error("Forbidden");
    }

    return articleRepository.create({
      ...payload,
      authorId: user.id,
    });
  },

  list() {
    return articleRepository.findAll();
  },
};
