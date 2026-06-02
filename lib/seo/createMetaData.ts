import type { Metadata } from "next";
import { DEFAULT_OG, SITE_NAME, SITE_URL } from "./constant";

type MetaInput = {
  title: string;
  description: string;
  path?: string;
  image?: string | null;
  canonical?: string;
  noIndex?: boolean;
  keywords?: string[];
  type?:
    | "website"
    | "article"
    | "profile"
    | "book"
    | "music.song"
    | "music.album";
};

export function createMetadata({
  title,
  description,
  path = "/",
  image,
  canonical,
  noIndex = false,
  keywords = [],
  type = "website",
}: MetaInput): Metadata {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  const fullUrl = canonical ? canonical : `${SITE_URL}${cleanPath}`;

  const ogImage = image
    ? image.startsWith("http")
      ? image
      : `${SITE_URL}${image}`
    : `${SITE_URL}${DEFAULT_OG}`;

  return {
    metadataBase: new URL(SITE_URL),

    title: `${title} | ${SITE_NAME}`,

    description,

    keywords,

    alternates: {
      canonical: fullUrl,
    },

    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
      },
    },

    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: SITE_NAME,
      locale: "id_ID",
      type,

      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },

    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-32x32.png",
      apple: "/apple-touch-icon.png",
    },
  };
}
