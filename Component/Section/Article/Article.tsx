import {
  getArticleCategories,
  getArticles,
} from "@/lib/api/article/article.services";

import ArticleClient from "./ArticleClient";
import { IArticleCard } from "@/types/type";

export default async function ArticleSection() {
  const articles = await getArticles(
    new URLSearchParams({
      page: "1",
      limit: "1",
    }),
  );

  const categories = await getArticleCategories();

  return (
    <ArticleClient
      initialData={articles.data as IArticleCard[]}
      initialMeta={articles.meta}
      categories={categories}
    />
  );
}
