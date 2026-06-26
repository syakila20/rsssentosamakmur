import {
  getArticleCategories,
  getTagsArticle,
} from "@/lib/api/article/article.services";
import AddArticle from "../Components/ArticleForm/ArticleForm";

export default async function Page() {
  const categories = await getArticleCategories(false);
  const tags = await getTagsArticle();

  return (
    <AddArticle categories={categories} tagsArticle={tags} isCreate={true} />
  );
}
