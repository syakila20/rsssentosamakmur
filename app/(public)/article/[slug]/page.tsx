import Script from "next/script";
import { notFound } from "next/navigation";

import { getArticleBySlug } from "@/lib/api/article/article.services";

import { createJsonLd } from "@/lib/seo/createJsonLd";
import { createMetadata } from "@/lib/seo/createMetaData";
import { articleJsonLd } from "@/lib/seo/articleJsonId";
import BlogDetail from "@/Component/Section/Article/DetailArticle";
import PopularContent from "@/Component/Section/Article/PopularArticle";
import TrackArticleView from "@/Component/Section/Article/TrackArticleView";
import RelatedArticles from "@/Component/Section/Article/RelatedArticle";

import ReadingProgress from "@/Component/Section/Article/ReadingProgress";
import { formatDate } from "@/lib/helperDate";

import {
  extractToc,
  getReadingTimeFromHtml,
  injectHeadingIds,
  sanitizeHtml,
  wrapImages,
} from "@/lib/contentDetail";
import LinkBack from "@/Component/LinkBack/LinkBack";
import ArticleToc from "@/Component/Section/Article/TocActive";
import { SITE_URL } from "@/lib/seo/constant";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  const article = await getArticleBySlug(slug);

  if (!article) {
    return createMetadata({
      title: "Artikel Tidak Ditemukan",
      description: "Halaman artikel tidak ditemukan",
      noIndex: true,
    });
  }

  return createMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/article/${article.slug}`,
    image: article.thumbnail || "",
    type: "article",
    canonical: `${SITE_URL}/article/${article?.slug}`,
    keywords: [
      article.category?.name,
      article.title,
      "health article",
      "medical article",
    ],
  });
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;

  const article = await getArticleBySlug(slug);

  if (!article) return notFound();

  const withIds = injectHeadingIds(article.content);

  const safeHtml = sanitizeHtml(withIds);

  const finalHtml = wrapImages(safeHtml);

  const toc = extractToc(withIds);

  const readingTime = getReadingTimeFromHtml(article.content);

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

      <TrackArticleView slug={article.slug} />
      <ReadingProgress />
      <main className="min-h-screen bg-linear-to-br from-slate-50 via-white to-fuchsia-50 pt-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 py-10">
          <div className="mb-8">
            <LinkBack
              linkTo="/article"
              title={
                <div className="inline-flex items-center rounded-full bg-emerald-100/50 px-4 py-1 text-sm font-medium text-teal-700">
                  {article.category?.name}
                </div>
              }
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <article className="lg:col-span-8">
              <div className="rounded-3xl overflow-hidden">
                <BlogDetail
                  title={article.title}
                  image={article.thumbnail || ""}
                  date={formatDate(article.createdAt, "text")}
                  readingTime={readingTime}
                  content={finalHtml?.replace(/\\n\s*\\n/g, "")}
                  publishBy={article.author?.name}
                  profile={article?.author?.avatar as string}
                />
              </div>
              {/* <div className="flex items-center my-12">
                <div className="flex-1 h-px bg-slate-200" />

                <div className="mx-4 flex items-center justify-center">
                  <span className="text-slate-400 text-lg">❝</span>
                </div>

                <div className="flex-1 h-px bg-slate-200" />
              </div> */}
              <div className="flex items-center my-14">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                <div className="mx-4 flex items-center justify-center">
                  <span className="text-slate-300 text-xl font-light">❝</span>
                </div>

                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
              </div>
              <RelatedArticles
                category={article.category?.slug}
                currentSlug={article.slug}
              />
            </article>

            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28 space-y-8">
                {toc.length > 0 && <ArticleToc toc={toc} />}
                <PopularContent />
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
