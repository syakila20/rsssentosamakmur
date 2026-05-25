import { SITE_URL } from "../constant";

interface DoctorSEO {
  name: string;
  slug: string;
  specialty: string;
  image?: string;
  location?: string;
}

export function doctorJsonLd(doctor: DoctorSEO) {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",

    name: doctor.name,

    medicalSpecialty: doctor.specialty,

    image: doctor.image,

    url: `${SITE_URL}/doctor/${doctor.slug}`,

    address: {
      "@type": "PostalAddress",
      addressLocality: doctor.location,
    },
  };
}
