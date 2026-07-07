import { z } from "zod";

export const createArticleSchema = z.object({
  title: z.string().min(3).max(255),
  excerpt: z.string().optional(),
  thumbnail: z.string().optional(),
  contentJson: z.string(),
  categoryId: z.number(),
  tagIds: z.array(z.number()),
});

export type CreateArticleInput = z.infer<typeof createArticleSchema>;
