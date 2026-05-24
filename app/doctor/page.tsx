import { getDoctors } from "@/lib/doctor/doctor.service";
import DoctorFilter from "./DoctorFilter";
import { Doctor } from "@/app/generated/prisma/client";
import DoctorPagination from "./DoctorPagination";

interface Props {
  searchParams: {
    specialty?: string;
    search?: string;
    sort?: string;
    isOnline?: string;
    page?: string;
  };
}

export default async function Page({ searchParams }: Props) {
  const result = await getDoctors({
    specialty: searchParams.specialty ?? null,
    search: searchParams.search ?? null,
    sort: searchParams.sort ?? null,
    isOnline: searchParams.isOnline ?? null,
    page: Number(searchParams.page ?? 1),
    limit: 6,
  });

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Daftar Dokter</h1>

      <DoctorFilter />

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {result.data.map((doctor: Doctor) => (
          <div key={doctor.id} className="border p-4 rounded-lg">
            <h2 className="font-semibold">{doctor.name}</h2>
            <p>{doctor?.specialtyId}</p>
            <p>⭐ {doctor.rating}</p>
            {doctor.isOnline && (
              <span className="text-green-600 text-sm">Tersedia Online</span>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
