import { requireAuth } from "@/lib/auth/require-auth";
import ListArticle from "./Components/Table/Table";
import Title from "@/Component/Title/Title";
import { CardTitle, Description } from "@/Component/Typography/Typhography";
import {
  getArticleCategories,
  getArticles,
} from "@/lib/api/article/article.services";

interface Props {
  searchParams: Promise<{
    page?: string;
    category?: string;
    search?: string;
  }>;
}
export default async function Article({ searchParams }: Props) {
  const params = await searchParams;

  const query = new URLSearchParams(params);

  const articles = await getArticles(query);
  const categories = await getArticleCategories();
  return (
    <div>
      <CardTitle className="text-2xl lg:text-3xl pb-10">Article</CardTitle>
      <ListArticle
        initialData={articles.data as []}
        initialMeta={articles.meta}
        categories={categories}
      />
    </div>
  );
}
