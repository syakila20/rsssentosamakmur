import { notFound } from "next/navigation";
import ListDokterRelated from "./ListDokterRelated";

import {
  getDoctorBySlug,
  getDoctors,
  getRelatedDoctorBySlug,
} from "@/lib/api/doctor/doctors.service";
import { IDoctorCard } from "@/types/type";
import DoctorDetail from "./Detail";

interface Props {
  params: Promise<{
    slug: string[];
  }>;
}

const Page = async ({ params }: Props) => {
  const { slug } = await params;
  const doctor = await getDoctorBySlug(slug);
  if (!doctor) return notFound();
  const relatedDoctors = await getRelatedDoctorBySlug(slug);
  return (
    <section className="w-[94%] md:w-[85%] xl:w-[85%] mx-auto pt-40 bg-linear-to-br from-fuchsia-50 to-teal-50 relative py-4 h-auto">
      <DoctorDetail doctor={doctor} />
      <ListDokterRelated
        doctor={relatedDoctors as IDoctorCard[]}
        category={slug[0]}
      />
    </section>
  );
};
export default Page;
