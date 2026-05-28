// "use client";

// import BlogCard from "@/Component/card/Blog";

// import FilterPill from "@/Component/PillCheckbox/FiterPill";

// import Pagination from "@/Component/pagination/Pagination";

// import { formatDate } from "@/lib/helperDate";

// import type { IArticleCard, IOption } from "@/types/type";
// import { useQueryServer } from "@/hooks/useQuery";
// import SafeImage from "@/Component/SafeImage/SafeImage";
// import Link from "next/link";

// type Meta = {
//   page: number;
//   limit: number;
//   total: number;
//   totalPages: number;
//   hasNextPage: boolean;
//   hasPreviousPage: boolean;
// };

// interface ArticleClientProps {
//   initialData: IArticleCard[];

//   initialMeta: Meta;

//   categories: IOption[];
// }

// export default function ArticleClient({
//   initialData,
//   initialMeta,
//   categories,
// }: ArticleClientProps) {
//   const { category, isPending, setCategory, setPage } = useQueryServer({
//     pageKey: "page",
//     categoryKey: "category",
//   });

//   return (
//     <section className="bg-linear-to-br from-fuchsia-50 to-teal-50 relative overflow-hidden py-4">
//       <div className=" w-[90%] md:w-[85%] xl:w-[85%] mx-auto mt-40 ">
//         <section className="grid lg:grid-cols-2 gap-10 items-center mb-2 mt-10">
//           {/* Left Text */}
//           <div>
//             <h1 className="text-3xl lg:text-5xl font-bold leading-tight text-gray-900">
//               Our Blogs Healthy,
//               <span className="text-emerald-600">Happier Life</span>
//             </h1>

//             <p className="mt-6 text-gray-600 text-lg">
//               Discover expert health insight, wellness advice, and medical
//               update to help you make informed decisions and live a healthier
//               life every day
//             </p>
//           </div>

//           {/* Right Featured */}
//           <div className="relative">
//             <div className="absolute top-4 right-4 bg-emerald-500 text-white text-xs px-2 py-2 rounded-full shadow-md">
//               🔥 Most Read
//             </div>

//             <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
//               <div className="p-2 rounded-2xl">
//                 <SafeImage
//                   src={initialData?.[0]?.thumbnail}
//                   alt={initialData?.[0]?.title}
//                   width={800}
//                   height={500}
//                   className="w-full h-72 rounded-2xl object-cover"
//                 />
//               </div>
//               <div className="px-4 flex items-center gap-1 text-xs text-gray-400 w-full pt-4">
//                 <div className="rounded-2xl text-xs flex items-center text-blue-600/90">
//                   Kesling RS
//                 </div>
//                 <span>•</span>
//                 <span>
//                   {formatDate(initialData?.[0]?.publishedAt as Date, "long")}
//                 </span>
//               </div>
//               <div className="px-4 py-2">
//                 <h3 className="font-semibold text-xl mb-2 text-zinc-700">
//                   {initialData?.[0]?.title}
//                 </h3>
//                 <p className="text-zinc-500 text-sm line-clamp-2">
//                   {initialData?.[0]?.excerpt}
//                 </p>
//                 <Link
//                   href={`/article/${initialData?.[0]?.slug}`}
//                   className="text-emerald-600 text-sm font-medium mt-4 inline-block"
//                 >
//                   Baca Selengkapnya →
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </section>
//         <section id="list-blog">
//           <div className="flex items-center justify-between my-8">
//             <h2 className="text-2xl font-bold text-gray-900">List Article</h2>
//             <div className="h-[1px] flex-1 bg-linear-to-r from-blue-500 to-transparent ml-6"></div>
//           </div>

//           <FilterPill
//             arrPill={categories}
//             selected={category}
//             multiple={false}
//             onChange={(val) => setCategory(val === "all" ? "" : String(val))}
//           />

//           <div
//             aria-hidden="true"
//             className="absolute top-50 -right-37.5 w-125 h-125 bg-pink-300 rounded-full filter blur-3xl opacity-20 mix-blend-multiply animate-blob animation-delay-2000"
//           />
//           <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
//             {initialData?.map((x, idx) => {
//               return (
//                 <BlogCard
//                   key={idx}
//                   slug={x?.slug}
//                   title={x?.title}
//                   excerpt={x?.excerpt}
//                   image={x?.thumbnail || ""}
//                   category={x?.category?.name}
//                   date={formatDate(
//                     initialData?.[0]?.publishedAt as Date,
//                     "text",
//                   )}
//                 />
//               );
//             })}
//           </div>
//           <div className="my-2 flex justify-end">
//             <div className="mt-10">
//               <Pagination
//                 page={initialMeta.page}
//                 totalPages={initialMeta.totalPages}
//                 hasNextPage={initialMeta.hasNextPage}
//                 hasPreviousPage={initialMeta.hasPreviousPage}
//                 isPending={isPending}
//                 onNext={() => setPage(initialMeta.page + 1)}
//                 onPrev={() => setPage(initialMeta.page - 1)}
//               />
//             </div>
//           </div>
//         </section>
//       </div>
//     </section>
//   );
// }
"use client";

import Link from "next/link";

import BlogCard from "@/Component/card/Blog";
import FilterPill from "@/Component/PillCheckbox/FiterPill";
import Pagination from "@/Component/pagination/Pagination";
import SafeImage from "@/Component/SafeImage/SafeImage";

import { formatDate } from "@/lib/helperDate";
import { useQueryServer } from "@/hooks/useQuery";

import type { IArticleCard, IOption } from "@/types/type";

type Meta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

interface ArticleClientProps {
  initialData: IArticleCard[];
  initialMeta: Meta;
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
        {/* ================= HERO SECTION ================= */}
        <section className="grid lg:grid-cols-2 gap-10 items-center">
          {/* TEXT */}
          <div>
            <h1 className="text-3xl lg:text-5xl font-bold leading-tight text-gray-900">
              Blog Kesehatan untuk Hidup Lebih{" "}
              <span className="text-emerald-600">Sehat & Bahagia</span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Temukan berbagai artikel kesehatan, tips gaya hidup sehat, dan
              wawasan medis terpercaya untuk membantu Anda menjalani hidup yang
              lebih berkualitas setiap hari.
            </p>
          </div>

          {/* FEATURED ARTICLE */}
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

        {/* ================= LIST SECTION ================= */}
        <section id="list-article">
          {/* HEADER */}
          <div className="flex items-center gap-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Artikel Terbaru
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-emerald-500 to-transparent" />
          </div>

          {/* FILTER */}
          <FilterPill
            arrPill={categories}
            selected={category}
            multiple={false}
            onChange={(val) => setCategory(val === "all" ? "" : String(val))}
          />

          {/* BACKDROP DECOR */}
          <div
            aria-hidden="true"
            className="absolute top-52 -right-40 w-96 h-96 bg-pink-300 rounded-full blur-3xl opacity-20 mix-blend-multiply"
          />

          {/* GRID */}
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

          {/* PAGINATION */}
          <div className="flex justify-end mt-10">
            <Pagination
              page={initialMeta.page}
              totalPages={initialMeta.totalPages}
              hasNextPage={initialMeta.hasNextPage}
              hasPreviousPage={initialMeta.hasPreviousPage}
              isPending={isPending}
              onNext={() => setPage(initialMeta.page + 1)}
              onPrev={() => setPage(initialMeta.page - 1)}
            />
          </div>
        </section>
      </div>
    </section>
  );
}
