import { notFound } from "next/navigation";
import ListDokterRelated from "./ListDokterRelated";

import {
  getDoctorBySlug,
  getRelatedDoctorBySlug,
} from "@/lib/api/doctor/doctors.service";

import { IDoctorCard } from "@/types/type";
import DoctorDetail from "./Detail";

import { createMetadata } from "@/lib/seo/createMetaData";
import { doctorJsonLd } from "@/lib/seo/builder/doctor";

interface Props {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  const doctor = await getDoctorBySlug(slug);

  if (!doctor) {
    return createMetadata({
      title: "Dokter Tidak Ditemukan",
      description: "Halaman dokter tidak ditemukan.",
      noIndex: true,
    });
  }

  const specialty = doctor.specialty?.label ?? "Dokter Spesialis";

  const specialtySlug = doctor.specialty?.slug ?? "";

  return createMetadata({
    title: `${doctor.name} - Dokter ${specialty} Pekanbaru`,
    description:
      doctor.bio ??
      `Temui ${doctor.name}, dokter ${specialty} terpercaya di RS Sentosa Makmur Pekanbaru. Lihat profil dokter, spesialisasi, dan informasi layanan kesehatan.`,

    path: `/doctor/${slug[0]}/${slug[1]}`,

    image: doctor.image,

    type: "profile",

    keywords: [
      doctor.name,
      specialty,
      specialtySlug,
      `dokter ${specialty.toLowerCase()} pekanbaru`,
      "dokter rumah sakit pekanbaru",
      "rumah sakit sentosa makmur",
      "dokter spesialis pekanbaru",
    ],
  });
}

const Page = async ({ params }: Props) => {
  const { slug } = await params;

  const doctor = await getDoctorBySlug(slug);

  if (!doctor) return notFound();

  const relatedDoctors = await getRelatedDoctorBySlug(slug);

  const jsonLd = doctorJsonLd({
    name: doctor.name,
    slug: doctor.slug,
    specialty: doctor.specialty?.label,
    image: doctor.image,
    location: "PEKANBARU",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <section className="w-[94%] md:w-[85%] xl:w-[85%] mx-auto pt-40 bg-linear-to-br from-fuchsia-50 to-teal-50 relative py-4 h-auto">
        <DoctorDetail doctor={doctor} />

        <ListDokterRelated
          doctor={relatedDoctors as IDoctorCard[]}
          category={slug[0]}
        />
      </section>
    </>
  );
};

export default Page;
