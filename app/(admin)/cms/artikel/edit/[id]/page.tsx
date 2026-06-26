import {
  getArticleCategories,
  getTagsArticle,
} from "@/lib/api/article/article.services";
import { getArticleById } from "@/modules/article/article.service";
import AddArticle from "../../Components/ArticleForm/ArticleForm";
import { IDetailArticle } from "@/modules/article/type";
type Props = {
  params: Promise<{
    id: string;
  }>;
};
export default async function Page({ params }: Props) {
  const { id } = await params;
  const [categories, tags, article] = await Promise.all([
    getArticleCategories(true),
    getTagsArticle(),
    getArticleById(Number(id)),
  ]);
  return (
    <AddArticle
      categories={categories}
      tagsArticle={tags}
      isCreate={false}
      content={article as IDetailArticle}
      idArticle={Number(id)}
    />
  );
}
