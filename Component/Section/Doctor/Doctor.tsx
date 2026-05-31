import DoctorClient from "./DoctorClient";
import {
  getDoctors,
  getDoctorsSpecialty,
} from "@/lib/api/doctor/doctors.service";

export default async function DoctorSection() {
  const initialDoctors = await getDoctors(
    new URLSearchParams({
      limit: "10",
      page: "1",
    }),
  );
  const categories = await getDoctorsSpecialty();

  return (
    <DoctorClient
      initialData={initialDoctors?.data as []}
      categories={categories}
      initialMeta={initialDoctors?.meta}
    />
  );
}
