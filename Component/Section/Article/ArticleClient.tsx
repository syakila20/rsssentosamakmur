"use client";

import BlogCard from "@/Component/card/Blog";
import FilterPill from "@/Component/PillCheckbox/FiterPill";
import Pagination from "@/Component/pagination/Pagination";
import Title from "@/Component/Title/Title";
import { useFilterClient } from "@/hooks/useFilterClient";
import { IArticleCard, IOption, SectionClientProps } from "@/types/type";
import { formatDate } from "@/lib/helperDate";
import Loading from "@/Component/Loading/Loading";
import EmptyData from "@/Component/NoData/EmptyData";

type Props = SectionClientProps<IArticleCard, IOption>;

export default function ArticleClient({
  initialData,
  initialMeta,
  categories,
}: Props) {
  const {
    data: articles,
    meta,
    filters,
    isPending,
    updateFilter,
    changePage,
  } = useFilterClient<IArticleCard>({
    endpoint: "/api/article",
    initialData: initialData,
    initialMeta,

    limit: 6,
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
          arrPill={categories as []}
          selected={filters.category as string}
          multiple={false}
          onChange={(val) => {
            updateFilter("category", val === "all" ? "" : String(val));
          }}
        />
      </div>

      {isPending && <Loading />}
      {articles.length === 0 && <EmptyData />}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-5">
        {articles.map((article) => (
          <BlogCard
            key={article.slug}
            category={article.category?.name}
            date={formatDate(article?.publishedAt as Date, "text")}
            excerpt={article.excerpt}
            image={article.thumbnail}
            slug={article.slug}
            title={article.title}
          />
        ))}
      </div>

      {/* PAGINATION
      <div className="mt-10">
        <Pagination
          page={meta.page}
          totalPages={meta.totalPages}
          hasNextPage={meta.hasNextPage}
          hasPreviousPage={meta.hasPreviousPage}
          isPending={isPending}
          onNext={() => changePage(meta.page + 1)}
          onPrev={() => changePage(meta.page - 1)}
        />
      </div> */}
    </section>
  );
}
