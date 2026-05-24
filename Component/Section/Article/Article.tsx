import {
  getArticleCategories,
  getArticles,
} from "@/lib/api/article/article.services";
import ArticleClient from "./ArticleClient";

export default async function ArticleSection() {
  const initialArticles = await getArticles(
    new URLSearchParams({
      limit: "10",
      page: "1",
    }),
  );

  const categories = await getArticleCategories();
  return (
    <ArticleClient
      initialArticles={initialArticles?.data as []}
      categories={categories as []}
      initialMeta={initialArticles?.meta}
    />
  );
}
