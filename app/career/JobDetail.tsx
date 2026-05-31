// "use client";

// import { formatSalary } from "@/lib/helper";
// import { formatDate } from "@/lib/helperDate";
// import { changeEnumEmployeType, IJobCard } from "@/types/type";

// interface IJobDetail {
//   job: IJobCard;
// }

// export default function JobDetail({ job }: IJobDetail) {
//   const daysLeft =
//     Math.ceil(
//       (new Date(job.deadline as Date).getTime() - new Date().getTime()) /
//         (1000 * 60 * 60 * 24),
//     ) || 0;

//   return (
//     <div>
//       {/* Header */}
//       <div className="space-y-4">
//         <div className="flex items-center justify-between flex-wrap gap-4">
//           <div>
//             <div className="flex items-center gap-2 text-slate-500 mt-2 text-sm">
//               <span>Divisi : {job.departement}</span>
//             </div>
//           </div>

//           {job.isUrgent && (
//             <span className="text-red-600 border border-red-400 text-xs font-semibold px-3 py-1 rounded-full">
//               Urgent Hiring
//             </span>
//           )}
//         </div>

//         <div className="flex flex-wrap gap-4 text-sm text-slate-600">
//           <div className="flex items-center gap-1">
//             {/* <Briefcase size={16} /> */}
//             {changeEnumEmployeType[job.employmentType]} •
//             {/* {job.workplaceType} */}
//           </div>
//           <div className="flex items-center gap-1">
//             {/* <CalendarDays size={16} /> */}
//             Batas Akhir {daysLeft} hari{" "}
//           </div>
//         </div>

//         <div className="text-lg font-semibold text-emerald-600/80">
//           {formatSalary(job?.salaryMin, job?.salaryMax)}
//         </div>
//       </div>

//       <section className="mt-4">
//         <h2 className="text-lg font-semibold mb-2 text-slate-600">
//           Tentang Pekerjaan
//         </h2>
//         <p className="text-gray-600 leading-relaxed">{job.description}</p>
//       </section>

//       <section className="mt-4 text-slate-600">
//         <h2 className="text-lg font-semibold mb-2">Persyaratan</h2>
//         <ul className="list-disc list-inside space-y-2 text-gray-600">
//           {job.requirements.map((item, index) => (
//             <li key={index}>{item?.value}</li>
//           ))}
//         </ul>
//       </section>

//       {/* Skills */}
//       <section className="mt-4 text-slate-600">
//         <h2 className="text-lg font-semibold mb-2">Keterampilan</h2>
//         <ul className="list-disc list-inside space-y-2 text-gray-600">
//           {job.skills.map((skill, index) => (
//             <li key={index}>{skill?.skill?.name}</li>
//           ))}
//         </ul>
//       </section>

//       <section className="mt-4 text-slate-600">
//         <h2 className="text-lg font-semibold mb-2">Benefits</h2>
//         <ul className="list-disc list-inside space-y-2 text-gray-600">
//           {job.benefits.map((item, index) => (
//             <li key={index}>{item?.value}</li>
//           ))}
//         </ul>
//       </section>

//       {/* Footer */}
//     </div>
//   );
// }
"use client";

import { formatSalary } from "@/lib/helper";
import { changeEnumEmployeType, IJobCard } from "@/types/type";

interface IJobDetail {
  job: IJobCard;
}

export default function JobDetail({ job }: IJobDetail) {
  const daysLeft = Math.max(
    0,
    job.deadline
      ? Math.ceil(
          (new Date(job.deadline).getTime() - new Date().getTime()) /
            (1000 * 60 * 60 * 24),
        )
      : 0,
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-slate-500 mt-2 text-sm flex-wrap">
              <span className="text-base font-semibold mb-3 text-slate-600">
                Divisi : {job.departement}
              </span>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-slate-600">
              <div className="bg-slate-200 px-3 py-1 rounded-full">
                {changeEnumEmployeType[job.employmentType]}
              </div>

              <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full">
                Deadline {daysLeft} hari lagi
              </div>
            </div>
          </div>

          {/* Urgent */}
          {job.isUrgent && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 min-w-[240px]">
              <div className="text-red-600 font-semibold text-sm">
                Urgent Hiring
              </div>

              <div className="text-red-500 text-sm mt-1">
                {"Posisi dibutuhkan secepatnya"}
              </div>
            </div>
          )}
        </div>

        {/* Meta */}

        {/* Salary */}
        <div className="text-2xl font-bold text-emerald-600">
          {formatSalary(job.salaryMin, job.salaryMax)}
        </div>
      </div>

      {/* Description */}
      <section>
        <h2 className="text-lg font-semibold mb-3 text-slate-700">
          Tentang Pekerjaan
        </h2>

        <p className="text-gray-600 leading-relaxed">{job.description}</p>
      </section>

      {/* Requirements */}
      {job.requirements?.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-3 text-slate-700">
            Persyaratan
          </h2>

          <ul className="list-disc list-inside space-y-2 text-gray-600">
            {job.requirements.map((item, index) => (
              <li key={index}>{item.value}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Skills */}
      {job.skills?.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-3 text-slate-700">
            Keterampilan
          </h2>

          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-full text-sm"
              >
                {skill.skill?.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Benefits */}
      {job.benefits?.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-3 text-slate-700">
            Benefits
          </h2>

          <ul className="list-disc list-inside space-y-2 text-gray-600">
            {job.benefits.map((item, index) => (
              <li key={index}>{item.value}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
