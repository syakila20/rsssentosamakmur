import Link from "next/link";

import { getRelatedArticles } from "@/lib/api/article/article.services";

import { formatDate } from "@/lib/helperDate";
import BlogCard from "@/Component/card/Blog";

interface Props {
  category: string;
  currentSlug: string;
}

export default async function RelatedArticles({
  category,
  currentSlug,
}: Props) {
  const articles = await getRelatedArticles(category, currentSlug);
  if (!articles.length) return null;

  return (
    <section className="">
      <div className="mb-5">
        <h2 className="text-3xl font-bold text-slate-700">Artikel Terkait</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <BlogCard
            excerpt=""
            key={article.slug}
            category={article.category?.name}
            date={formatDate(article?.createdAt as Date, "text")}
            image={article.thumbnail as string}
            slug={article.slug}
            title={article.title}
          />
          // <Link
          //   key={article.id}
          //   href={`/article/${article.slug}`}
          //   className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition-all hover:-translate-y-1 hover:shadow-lg"
          // >
          //   <div className="aspect-[16/9] overflow-hidden">
          //     <img
          //       src={article.thumbnail || ""}
          //       alt={article.title}
          //       className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          //     />
          //   </div>

          //   <div className="p-5">
          //     <p className="text-xs font-medium uppercase tracking-wide text-fuchsia-600">
          //       {article.category?.name}
          //     </p>

          //     <h3 className="mt-2 line-clamp-2 text-lg font-bold text-slate-900 group-hover:text-fuchsia-600">
          //       {article.title}
          //     </h3>

          //     <p className="mt-4 text-sm text-slate-500">
          //       {formatDate(article.createdAt, "text")}
          //     </p>
          //   </div>
          // </Link>
        ))}
      </div>
    </section>
  );
}
