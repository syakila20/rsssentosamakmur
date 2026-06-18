"use client";

import LinkBack from "@/Component/LinkBack/LinkBack";
import Loading from "@/Component/Loading/Loading";
import EmptyData from "@/Component/NoData/EmptyData";
import PaginationClient from "@/Component/pagination/PaginationClient";
import FilterPill from "@/Component/PillCheckbox/FiterPill";
import DoctorCard from "@/Component/Section/Doctor/CardDoctor";
import { useQueryServer } from "@/hooks/useQuery";
import { IPropDoctors } from "@/types/type";

export default function DoctorPage({
  initialData,
  initialMeta,
  categories,
}: IPropDoctors) {
  const { category, isPending, setCategory, setPage } = useQueryServer({
    pageKey: "page",
    categoryKey: "category",
  });

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-fuchsia-50 to-teal-50 pt-10">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
      linear-gradient(to right, #0f172a 1px, transparent 1px),
      linear-gradient(to bottom, #0f172a 1px, transparent 1px)
    `,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-fuchsia-200 blur-3xl opacity-20" />
      <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-teal-200 blur-3xl opacity-20" />

      <div className="relative w-[90%] md:w-[85%] xl:w-[85%] mx-auto pt-32 pb-16">
        <div className="mt-8 max-w-3xl">
          <LinkBack
            title={
              <span className="inline-block text-sm px-4 py-1 border border-emerald-800/50 rounded-full text-emerald-800/50">
                Tim Medis Profesional
              </span>
            }
            linkTo="/"
          />

          <h1 className="mt-6 text-4xl md:text-5xl font-bold text-slate-700">
            Temukan Dokter Terbaik
          </h1>

          <p className="mt-5 text-lg text-gray-400 leading-relaxed">
            Kami hadir untuk membantu Anda menemukan tenaga medis yang peduli
            dan tepercaya, agar setiap kunjungan terasa nyaman dan aman.
          </p>
        </div>
        <section id="list-doctors">
          <div className="mt-4 mb-4">
            <FilterPill
              arrPill={categories as []}
              selected={category as string}
              multiple={false}
              onChange={(val) => setCategory(val === "all" ? "" : String(val))}
            />
          </div>
          {isPending && <Loading />}
          {initialData.length === 0 && <EmptyData />}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-5">
            {initialData.map((doctor) => (
              <DoctorCard key={doctor?.id} doctor={doctor} />
            ))}
          </div>
          <PaginationClient
            page={initialMeta.page}
            totalPages={initialMeta.totalPages}
            hasNextPage={initialMeta.hasNextPage}
            hasPreviousPage={initialMeta.hasPreviousPage}
            isPending={isPending}
            onNext={() => setPage(initialMeta.page + 1)}
            onPrev={() => setPage(initialMeta.page - 1)}
          />
        </section>
      </div>
    </section>
  );
}
