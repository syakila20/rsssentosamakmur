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
  const isPublished = params?.status === "0";

  const articles = await getArticles(query, false);
  const categories = await getArticleCategories(false);
  return (
    <ListArticle
      initialData={articles.data as []}
      initialMeta={articles.meta}
      categories={categories}
    />
  );
}
