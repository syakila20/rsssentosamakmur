import { Prisma } from "@prisma/client";

export type CreateArticlePayload = {
  title: string;
  excerpt?: string;
  thumbnail?: string;
  contentJson: string;
  content?: string;
  categoryId: number;
  tagIds: number[];
};

export type SessionUser = {
  id: number;
  permissions: string[];
};
export type UpdateArticlePayload = Partial<CreateArticlePayload>;

export type ArticleStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";
export const ARTICLE_STATUS = {
  DRAFT: "DRAFT",
  PUBLISHED: "PUBLISHED",
  ARCHIVED: "ARCHIVED",
} as const;

export const detailArticles = {
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
} satisfies Prisma.ArticleSelect;

export type IDetailArticle = Prisma.ArticleGetPayload<{
  select: typeof detailArticles;
}>;
