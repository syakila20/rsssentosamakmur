import DoctorClient from "./DoctorClient";
import { getDoctors } from "@/lib/api/doctor/doctors.service";

export default async function DoctorSection() {
  const initialDoctors = await getDoctors(
    new URLSearchParams({
      limit: "10",
      page: "1",
    }),
  );

  return (
    <DoctorClient
      initialData={initialDoctors?.data as []}
      categories={[]}
      initialMeta={initialDoctors?.meta}
    />
  );
}
