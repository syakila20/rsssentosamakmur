export const dynamic = "force-dynamic";

import {
  getArticles,
  getArticleCategories,
  getPopularArticles,
} from "@/lib/api/article/article.services";
import ArticleClient from "./Client";
import { IArticleCard } from "@/types/type";
import { createMetadata } from "@/lib/seo/createMetaData";
import { SITE_URL } from "@/lib/seo/constant";

interface Props {
  searchParams: Promise<{
    page?: string;
    category?: string;
    search?: string;
  }>;
}

export async function generateMetadata({ searchParams }: Props) {
  const params = await searchParams;

  const category = params.category;

  if (category) {
    return createMetadata({
      title: `Artikel ${category}`,
      description: `Kumpulan artikel kesehatan ${category}`,
      path: `/article?category=${category}`,
      canonical: `${SITE_URL}/article?category=kesehatan-ibu-kehamilan`,
    });
  }

  return createMetadata({
    title: " Artikel Kesehatan untuk Hidup Lebih",
    description:
      "Temukan berbagai artikel kesehatan, tips gaya hidup sehat, dan wawasan medis terpercaya untuk membantu Anda menjalani hidup yang lebih berkualitas setiap hari",
    path: "/article",
    canonical: `${SITE_URL}/article`,
  });
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
