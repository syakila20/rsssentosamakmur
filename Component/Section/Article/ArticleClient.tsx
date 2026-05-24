"use client";

import BlogCard from "@/Component/card/Blog";
import FilterPill from "@/Component/PillCheckbox/FiterPill";
import Title from "@/Component/Title/Title";
import { IArticleCard } from "@/types/type";
import { IOption } from "@/lib/interface";
import { useFilterClient } from "@/hooks/useFilterClient";
// import PaginationClient from "@/Component/pagination/PaginationClient";

interface Props {
  initialArticles: IArticleCard[];
  categories: IOption[];
  initialMeta: {
    page: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    total: number;
  };
}

export default function ArticleClient({
  initialArticles,
  categories,
  initialMeta,
}: Props) {
  const {
    data: articles,
    filters,
    meta,
    updateFilter,
    changePage,
    isPending,
  } = useFilterClient({
    endpoint: "/api/article",
    initialData: initialArticles,
    initialMeta: initialMeta,
    limit: 10,
  });
  return (
    <section className="relative overflow-hidden w-[95%] md:w-[85%] xl:w-[85%] mx-auto py-4">
      <div className="flex justify-between md:flex-row lg:flex-row flex-col">
        <div className="h-25">
          <Title title="Blog" linkTo="/article" />
        </div>

        <span className="w-112.5 text-gray-400 content-center mt-10 lg:mt-0 md:mt-0">
          Dapatkan tips kesehatan, saran gaya hidup, dan informasi medis
          terbaru.
        </span>
      </div>

      <div className="mt-4 mb-4">
        <FilterPill
          arrPill={categories}
          selected={filters.category}
          multiple={false}
          onChange={(val) => updateFilter("category", val as string)}
        />
      </div>

      {isPending && <p className="text-sm text-gray-500 mb-4">Loading...</p>}

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-5">
        {articles.map((article) => (
          <BlogCard
            key={article.slug}
            category={article.category}
            date={article.createdAt}
            excerpt={article.excerpt}
            image={article.thumbnail}
            slug={article.slug}
            title={article.title}
          />
        ))}
      </div>
      {/* <PaginationClient
        page={meta.page}
        totalPages={meta.totalPages}
        hasNextPage={meta.hasNextPage}
        hasPreviousPage={meta.hasPreviousPage}
        isPending={isPending}
        onNext={() => changePage(meta.page + 1)}
        onPrev={() => changePage(meta.page - 1)}
      /> */}
    </section>
  );
}
