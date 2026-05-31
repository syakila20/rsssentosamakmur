import {
  getArticles,
  getArticleCategories,
  getPopularArticles,
} from "@/lib/api/article/article.services";
import ArticleClient from "./Client";
import { IArticleCard } from "@/types/type";

interface Props {
  searchParams: Promise<{
    page?: string;
    category?: string;
    search?: string;
  }>;
}

export default async function ArticlePage({ searchParams }: Props) {
  const params = await searchParams;

  const query = new URLSearchParams(params);

  const articles = await getArticles(query);
  const categories = await getArticleCategories();
  const articlesPopular = await getPopularArticles(1);
  return (
    <ArticleClient
      initialData={articles.data as []}
      initialMeta={articles.meta}
      categories={categories}
      initialDataPopular={articlesPopular[0] as IArticleCard}
    />
  );
}
