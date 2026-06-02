import { SITE_URL } from "../constant";

interface DoctorSEO {
  name: string;
  slug: string;
  specialty: string;
  image?: string;
  location?: string;
}

export function doctorJsonLd({
  name,
  location,
  slug,
  specialty,
  image,
}: DoctorSEO) {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",

    name: name,

    medicalSpecialty: specialty,

    image: image,

    url: `${SITE_URL}/doctor/${slug}`,

    address: {
      "@type": "PostalAddress",
      addressLocality: location,
    },
  };
}
