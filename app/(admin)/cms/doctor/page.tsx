import { CardTitle, Description } from "@/Component/Typography/Typhography";
import ListDoctor from "./client";
import {
  getDoctors,
  getDoctorsSpecialty,
} from "@/lib/api/doctor/doctors.service";

interface Props {
  searchParams: Promise<{
    page?: string;
    category?: string;
    search?: string;
  }>;
}
export default async function Article({ searchParams }: Props) {
  const params = await searchParams;

  const query = new URLSearchParams(params);
  const result = await getDoctors(query);
  const categories = await getDoctorsSpecialty();
  return (
    <div>
      <CardTitle className="text-2xl lg:text-3xl pb-10">Article</CardTitle>
      <ListDoctor
        initialData={result?.data as []}
        categories={categories}
        initialMeta={result?.meta}
      />
    </div>
  );
}
