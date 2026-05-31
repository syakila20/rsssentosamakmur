import {
  getDoctors,
  getDoctorsSpecialty,
} from "@/lib/api/doctor/doctors.service";
import DoctorFilter from "./DoctorFilter";

interface Props {
  searchParams: {
    specialty?: string;
    search?: string;
    page?: string;
  };
}

export default async function DoctorPage({ searchParams }: Props) {
  const params = await searchParams;
  const query = new URLSearchParams(params);
  const result = await getDoctors(query);
  const categories = await getDoctorsSpecialty();
  return (
    <DoctorFilter
      initialData={result?.data as []}
      categories={categories}
      initialMeta={result?.meta}
    />
  );
}
