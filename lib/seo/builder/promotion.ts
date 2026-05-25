import { SITE_URL } from "../constant";

interface PromoSEO {
  title: string;
  slug: string;
  description: string;
  image?: string;
  price?: number;
}

export function promoJsonLd(promo: PromoSEO) {
  return {
    "@context": "https://schema.org",

    "@type": "Offer",

    name: promo.title,

    description: promo.description,

    image: promo.image,

    url: `${SITE_URL}/promo/${promo.slug}`,

    price: promo.price,

    priceCurrency: "IDR",

    availability: "https://schema.org/InStock",
  };
}
