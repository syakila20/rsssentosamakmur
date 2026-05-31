"use client";

import FilterPill from "@/Component/PillCheckbox/FiterPill";
import Title from "@/Component/Title/Title";
import { useFilterClient } from "@/hooks/useFilterClient";
import { IDoctorCardSpec, IPropDoctors } from "@/types/type";
import DoctorCard from "./CardDoctor";
import PaginationClient from "@/Component/pagination/PaginationClient";
import Loading from "@/Component/Loading/Loading";
// import PaginationClient from "@/Component/pagination/PaginationClient";

export default function DoctorClient({
  initialData,
  initialMeta,
  categories,
  showPagination,
}: IPropDoctors) {
  const {
    data: doctors,
    meta,
    filters,
    isPending,
    updateFilter,
    changePage,
  } = useFilterClient<IDoctorCardSpec>({
    endpoint: "/api/doctors",
    initialData: initialData,
    initialMeta,

    limit: 10,
  });
  return (
    <section className="relative overflow-hidden w-[95%] md:w-[85%] xl:w-[85%] mx-auto py-4">
      <div className="flex justify-between md:flex-row lg:flex-row flex-col">
        <div className="h-25">
          <Title title="Temukan Dokter" linkTo="/article" />
        </div>

        <span className="w-112.5 text-gray-400 content-center mt-10 lg:mt-0 md:mt-0">
          Kami hadir untuk membantu Anda menemukan tenaga medis yang peduli dan
          tepercaya, agar setiap kunjungan terasa nyaman dan aman.
        </span>
      </div>

      <div className="mt-4 mb-4">
        <FilterPill
          arrPill={categories as []}
          selected={filters.category as string}
          multiple={false}
          onChange={(val) =>
            updateFilter("category", val === "all" ? "" : String(val))
          }
        />
      </div>

      {isPending && <Loading />}

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-5">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor?.id} doctor={doctor} />
        ))}
      </div>
      {showPagination && (
        <PaginationClient
          page={meta.page}
          totalPages={meta.totalPages}
          hasNextPage={meta.hasNextPage}
          hasPreviousPage={meta.hasPreviousPage}
          isPending={isPending}
          onNext={() => changePage(meta.page + 1)}
          onPrev={() => changePage(meta.page - 1)}
        />
      )}
    </section>
  );
}
