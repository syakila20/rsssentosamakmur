/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";

export const articleRepository = {
  create(data: any) {
    return prisma.article.create({ data });
  },

  findAll() {
    return prisma.article.findMany({
      where: { deletedAt: null },
      include: { author: true },
    });
  },
};
