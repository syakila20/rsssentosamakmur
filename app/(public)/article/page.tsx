export const revalidate = 300;

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
    const readableCategory = category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return createMetadata({
      title: `Artikel Kesehatan ${readableCategory}`,
      description: `Kumpulan artikel kesehatan tentang ${readableCategory}. Temukan informasi medis terpercaya, tips kesehatan, dan edukasi medis terbaru.`,
      path: `/article?category=${category}`,
      canonical: `${SITE_URL}/article?category=${category}`,
      keywords: [category, "artikel kesehatan", "tips kesehatan"],
    });
  }

  return createMetadata({
    title: "Artikel Kesehatan untuk Hidup Lebih Sehat",
    description:
      "Temukan berbagai artikel kesehatan, tips gaya hidup sehat, dan wawasan medis terpercaya untuk membantu Anda menjalani hidup yang lebih berkualitas setiap hari.",
    path: "/article",
    canonical: `${SITE_URL}/article`,
    keywords: [
      "artikel kesehatan",
      "tips kesehatan",
      "informasi medis",
      "rumah sakit",
    ],
  });
}

export default async function ArticlePage({ searchParams }: Props) {
  const params = await searchParams;

  const query = new URLSearchParams(params);

  const articles = await getArticles(query, true);
  const categories = await getArticleCategories(false);
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
