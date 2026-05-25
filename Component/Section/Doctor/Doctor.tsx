import {
  getArticleCategories,
  getArticles,
} from "@/lib/api/article/article.services";
import DoctorClient from "./DoctorClient";
import { getDoctors } from "@/lib/api/doctor/doctors.service";

export default async function DoctorSection() {
  const initialDoctors = await getDoctors(
    new URLSearchParams({
      limit: "10",
      page: "1",
    }),
  );

  const categories = await getArticleCategories();
  return (
    <DoctorClient
      initialData={initialDoctors?.data as []}
      categories={categories as []}
      initialMeta={initialDoctors?.meta}
    />
  );
}
