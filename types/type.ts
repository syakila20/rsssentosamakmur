import { Prisma } from "@prisma/client";

export type ArticleWithAuthor = Prisma.ArticleGetPayload<{
  include: {
    author: {
      select: {
        name: true;
      };
    };
  };
}>;

export interface IArticleCard {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  createdAt: string;
  thumbnail: string;
}
