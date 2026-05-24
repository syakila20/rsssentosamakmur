/* eslint-disable @typescript-eslint/no-explicit-any */
import { articleRepository } from "./article.repository";
import { can } from "@/lib/rbac";

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
