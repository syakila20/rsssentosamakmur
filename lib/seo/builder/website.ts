import { SITE_NAME, SITE_URL } from "../constant";

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",

    name: SITE_NAME,
    url: SITE_URL,

    logo: `${SITE_URL}/logo.png`,

    sameAs: [
      "https://instagram.com/yourbrand",
      "https://facebook.com/yourbrand",
    ],

    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+62-812-0000-0000",
      contactType: "customer service",
    },
  };
}
