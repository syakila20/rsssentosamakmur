"use client";

import Link from "next/link";

import BlogCard from "@/Component/card/Blog";
import FilterPill from "@/Component/PillCheckbox/FiterPill";
import Pagination from "@/Component/pagination/Pagination";
import SafeImage from "@/Component/SafeImage/SafeImage";

import { formatDate } from "@/lib/helperDate";
import { useQueryServer } from "@/hooks/useQuery";

import type { ApiMeta, IArticleCard, IOption } from "@/types/type";
import LinkBack from "@/Component/LinkBack/LinkBack";

interface ArticleClientProps {
  initialData: IArticleCard[];
  initialMeta: ApiMeta;
  categories: IOption[];
  initialDataPopular: IArticleCard;
}

export default function ArticleClient({
  initialData,
  initialMeta,
  categories,
  initialDataPopular,
}: ArticleClientProps) {
  const { category, isPending, setCategory, setPage } = useQueryServer({
    pageKey: "page",
    categoryKey: "category",
  });

  const featuredArticle = initialData?.[0];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-fuchsia-50 to-teal-50 py-10">
      <div className="w-[90%] md:w-[85%] xl:w-[85%] mx-auto mt-32 space-y-14">
        <section className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <LinkBack
              title={
                <span className="inline-block text-sm px-4 py-1 border border-emerald-800/50 rounded-full text-emerald-800/50">
                  Artikel
                </span>
              }
              linkTo="/"
            />
            <h1 className="text-3xl lg:text-5xl font-bold leading-tight text-slate-700">
              Artikel Kesehatan untuk Hidup Lebih{" "}
              <span className="text-emerald-800">Sehat & Bahagia</span>
            </h1>

            <p className="mt-6 text-lg text-gray-400 leading-relaxed">
              Temukan berbagai artikel kesehatan, tips gaya hidup sehat, dan
              wawasan medis terpercaya untuk membantu Anda menjalani hidup yang
              lebih berkualitas setiap hari.
            </p>
          </div>

          {initialDataPopular && (
            <div className="relative">
              <span className="absolute top-4 right-4 bg-emerald-500 text-white text-xs px-3 py-1 rounded-full shadow-md">
                🔥 Artikel Terpopuler
              </span>

              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                <SafeImage
                  src={initialDataPopular.thumbnail || ""}
                  alt={initialDataPopular.title}
                  width={800}
                  height={500}
                  className="w-full h-72 object-cover"
                />

                <div className="px-5 pt-4 text-xs text-gray-500 flex items-center gap-2">
                  <span className="text-emerald-600 font-medium">
                    {initialDataPopular?.author?.name}
                  </span>
                  <span>•</span>
                  <span>
                    {formatDate(featuredArticle.publishedAt as Date, "text")}
                  </span>
                </div>

                <div className="px-5 py-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {featuredArticle.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                    {featuredArticle.excerpt}
                  </p>

                  <Link
                    href={`/article/${featuredArticle.slug}`}
                    className="inline-block mt-4 text-emerald-600 text-sm font-medium hover:underline"
                  >
                    Selengkapnya →
                  </Link>
                </div>
              </div>
            </div>
          )}
        </section>

        <section id="list-article">
          <FilterPill
            arrPill={categories}
            selected={category}
            multiple={false}
            onChange={(val) => setCategory(val === "all" ? "" : String(val))}
          />

          <div
            aria-hidden="true"
            className="absolute top-52 -right-40 w-96 h-96 bg-pink-300 rounded-full blur-3xl opacity-20 mix-blend-multiply"
          />

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {initialData?.map((article) => (
              <BlogCard
                key={article.slug}
                slug={article.slug}
                title={article.title}
                excerpt={article.excerpt}
                image={article.thumbnail || ""}
                category={article.category?.name}
                date={formatDate(article.publishedAt as Date, "text")}
              />
            ))}
          </div>

          <Pagination
            page={initialMeta.page}
            totalPages={initialMeta.totalPages}
            hasNextPage={initialMeta.hasNextPage}
            hasPreviousPage={initialMeta.hasPreviousPage}
            isPending={isPending}
            onNext={() => setPage(initialMeta.page + 1)}
            onPrev={() => setPage(initialMeta.page - 1)}
          />
        </section>
      </div>
    </section>
  );
}
