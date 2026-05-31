"use client";

import LinkBack from "@/Component/LinkBack/LinkBack";
import Loading from "@/Component/Loading/Loading";
import EmptyData from "@/Component/NoData/EmptyData";
import PaginationClient from "@/Component/pagination/PaginationClient";
import FilterPill from "@/Component/PillCheckbox/FiterPill";
import DoctorCard from "@/Component/Section/Doctor/CardDoctor";
import DoctorSection from "@/Component/Section/Doctor/Doctor";
import DoctorClient from "@/Component/Section/Doctor/DoctorClient";
import { useQueryServer } from "@/hooks/useQuery";
import { IPropDoctors } from "@/types/type";
import Image from "next/image";

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
// <section className="relative overflow-hidden bg-linear-to-br from-fuchsia-50 via-white to-teal-50">
//   {/* Grid */}
//   {/* <div
//       className="absolute inset-0 opacity-[0.05]"
//       style={{
//         backgroundImage: `
//           linear-gradient(to right, #0f172a 1px, transparent 1px),
//           linear-gradient(to bottom, #0f172a 1px, transparent 1px)
//         `,
//         backgroundSize: "48px 48px",
//       }}
//     /> */}

//   <div className="absolute -top-20 left-0 h-96 w-96 rounded-full bg-fuchsia-300/20 blur-3xl" />
//   <div className="absolute top-40 right-0 h-96 w-96 rounded-full bg-teal-300/20 blur-3xl" />

//   <div className="relative w-[90%] md:w-[85%] mx-auto pt-40 pb-24">
//     <div className="text-center max-w-4xl mx-auto">
//       <span className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-teal-700 shadow">
//         Tim Medis Profesional
//       </span>

//       <h1 className="mt-8 text-5xl font-bold text-slate-700">
//         Temukan Dokter Terbaik
//       </h1>

//       <p className="mt-5 text-lg text-gray-500">
//         Konsultasikan kesehatan Anda dengan dokter umum dan spesialis
//         berpengalaman yang siap memberikan pelayanan terbaik.
//       </p>
//     </div>
//   </div>
//   <p className="mt-5 text-lg text-gray-500">
//     Konsultasikan kesehatan Anda dengan dokter umum dan spesialis
//     berpengalaman yang siap memberikan pelayanan terbaik.
//   </p>
// </section>
//  {/* <section className="w-[90%] md:w-[85%] mx-auto -mt-10 relative z-20">
//         <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
//           <div className="flex flex-col lg:flex-row gap-4">
//             <div className="relative flex-1">
//               {/* <Search
//                 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//                 size={20}
//               /> */}

//               <input
//                 type="text"
//                 placeholder="Cari nama dokter..."
//                 className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
//               />
//             </div>

//             <select className="h-12 px-4 rounded-xl border border-gray-200">
//               <option>Semua Spesialisasi</option>
//               <option>Penyakit Dalam</option>
//               <option>Anak</option>
//               <option>Jantung</option>
//               <option>Bedah</option>
//             </select>
//           </div>
//         </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"></div>
//       </section>
