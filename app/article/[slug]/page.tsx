// app/article/[slug]/page.tsx

import Script from "next/script";

import { notFound } from "next/navigation";

import { getArticleBySlug } from "@/lib/api/article/article.services";

import { createJsonLd } from "@/lib/seo/createJsonLd";
import { createMetadata } from "@/lib/seo/createMetaData";
import { articleJsonLd } from "@/lib/seo/articleJsonId";
import BlogDetail from "@/Component/Section/Article/DetailArticle";
import { formatDate } from "@/lib/helperDate";
import {
  extractToc,
  getReadingTimeFromHtml,
  injectHeadingIds,
  sanitizeHtml,
  wrapImages,
} from "@/lib/contentDetail";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  const article = await getArticleBySlug(slug);

  if (!article) return {};

  return createMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/article/${article.slug}`,
    image: article.thumbnail || "",
    type: "article",
  });
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;

  const article = await getArticleBySlug(slug);

  if (!article) return notFound();
  const withIds = injectHeadingIds(article?.content);
  const safeHtml = sanitizeHtml(withIds);
  const finalHtml = wrapImages(safeHtml);
  const toc = extractToc(withIds);
  const readingTime = getReadingTimeFromHtml(article?.content);

  const jsonLd = articleJsonLd({
    title: article.title,
    description: article.excerpt,
    slug: article.slug,
    image: article.thumbnail,
    publishedAt: article.createdAt,
  });

  return (
    <>
      <Script
        id="article-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={createJsonLd(jsonLd)}
      />

      <main className="bg-linear-to-br from-fuchsia-50 to-teal-50 min-h-screen pt-20 overflow-hidden lg:overflow-visible md:overflow-visible">
        <div className="mx-auto max-w-7xl px-4 py-20">
          {/* Flex wrapper agar sticky sidebar tidak “hilang” */}
          <div className="flex flex-col lg:flex-row gap-8">
            <article className="lg:flex-1">
              <BlogDetail
                title={article?.title}
                image={article?.thumbnail || ""}
                date={formatDate(article?.createdAt, "text")}
                readingTime={readingTime}
                content={finalHtml}
                category={article?.category}
              />
            </article>

            <aside className="lg:w-110 lg:pl-6 pt-1 lg:pt-32 md:pt-32">
              <div className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
                {/* <PopularPosts /> */}
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
