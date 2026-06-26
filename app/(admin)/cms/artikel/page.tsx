import ListArticle from "./Components/Table/Table";
import { CardTitle } from "@/Component/Typography/Typhography";
import {
  getArticleCategories,
  getArticles,
} from "@/lib/api/article/article.services";

interface Props {
  searchParams: Promise<{
    page?: string;
    category?: string;
    search?: string;
    status?: string;
  }>;
}
export default async function Article({ searchParams }: Props) {
  const params = await searchParams;

  const query = new URLSearchParams(params);
  const isPublished = params?.status === "1";

  const articles = await getArticles(query, isPublished);
  const categories = await getArticleCategories(true);
  return (
    <ListArticle
      initialData={articles.data as []}
      initialMeta={articles.meta}
      categories={categories}
    />
  );
}
