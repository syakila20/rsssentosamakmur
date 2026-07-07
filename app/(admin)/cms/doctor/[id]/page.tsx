import { getDoctorsSpecialty } from "@/lib/api/doctor/doctors.service";
import DetailDoctor from "./Client";

const page = async () => {
  const categories = await getDoctorsSpecialty(true);
  return <DetailDoctor categories={categories} />;
};

export default page;
