// lib/seo/articleJsonLd.ts

import { DEFAULT_OG, SITE_NAME, SITE_URL } from "./constant";

type ArticleJsonLdInput = {
  title: string;
  description: string;
  slug: string;
  image?: string | null;
  publishedAt: Date;
  updatedAt?: Date;
  author?: string;
};

export function articleJsonLd({
  title,
  description,
  slug,
  image,
  publishedAt,
  updatedAt,
  author = SITE_NAME,
}: ArticleJsonLdInput) {
  const url = `${SITE_URL}/article/${slug}`;

  return {
    "@context": "https://schema.org",

    "@type": "Article",

    headline: title,

    description,

    image: image || `${SITE_URL}${DEFAULT_OG}`,

    author: {
      "@type": "Organization",
      name: author,
    },

    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },

    mainEntityOfPage: url,

    datePublished: publishedAt.toISOString(),

    dateModified: (updatedAt || publishedAt).toISOString(),
  };
}
