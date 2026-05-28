import { getPopularArticles } from "@/lib/api/article/article.services";
import { formatDate } from "@/lib/helperDate";
import PopularCard from "@/Component/card/PopularBlog";

export default async function PopularContent() {
  const articles = await getPopularArticles(3);

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-neutral-600">Artikel Populer</h3>
      </div>

      <div className="space-y-5">
        {articles.map((article, index) => (
          <PopularCard
            key={article?.id}
            image={article?.thumbnail || ""}
            href={article?.slug}
            title={article?.title}
            description={article?.excerpt}
            views={article?.views}
            category={article?.category?.name}
            createdAt={formatDate(article.createdAt, "text")}
          />
        ))}
      </div>
    </section>
  );
}
