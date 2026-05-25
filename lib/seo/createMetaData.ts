import { MetaInput } from "@/types/type";
import { Metadata } from "next";
import { DEFAULT_OG, SITE_NAME, SITE_URL } from "./constant";

export function createMetadata({
  title,
  description,
  path,
  locale = "id",
  image,
  noIndex = false,
  type = "website",
}: MetaInput): Metadata {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  const url = `${SITE_URL}/${locale}${cleanPath}`;

  const ogImage = image || `${SITE_URL}${DEFAULT_OG}`;

  return {
    metadataBase: new URL(SITE_URL),

    title: {
      default: title,
      template: `%s | ${SITE_NAME}`,
    },

    description,

    alternates: {
      canonical: url,
    },

    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },

    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale,
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
