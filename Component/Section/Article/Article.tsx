import {
  getArticleCategories,
  getArticles,
} from "@/lib/api/article/article.services";

import ArticleClient from "./ArticleClient";

export default async function ArticleSection() {
  const articles = await getArticles(
    new URLSearchParams({
      page: "1",
      limit: "6",
    }),
  );

  const categories = await getArticleCategories();

  return (
    <ArticleClient
      initialData={articles.data as []}
      initialMeta={articles.meta}
      categories={categories}
    />
  );
}
