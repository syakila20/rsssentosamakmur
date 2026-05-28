"use client";

import { IDummyJob } from "@/app/dummyData";

interface JobDetailProps {
  job: IDummyJob;
}

export default function JobDetail({ job }: JobDetailProps) {
  const daysLeft =
    Math.ceil(
      (new Date(job.deadline).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24),
    ) || 0;

  return (
    <div>
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-base lg:text-[18pt] font-bold text-slate-700">
              {job.title}
            </h1>
            {/* <div className="flex items-center gap-2 text-slate-500 mt-2 text-sm">
              <span>{job.company.name}</span>
            </div> */}
          </div>

          {job.isUrgent && (
            <span className="text-red-600 border border-red-400 text-xs font-semibold px-3 py-1 rounded-full">
              Urgent Hiring
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
          <div className="flex items-center gap-1">
            {/* <Briefcase size={16} /> */}
            {job.employmentType} • {job.workplaceType}
          </div>
          <div className="flex items-center gap-1">
            {/* <CalendarDays size={16} /> */}
            Deadline in {daysLeft} days
          </div>
        </div>

        {/* Salary */}
        {job.salaryRange && (
          <div className="text-lg font-semibold text-emerald-600/80">
            {job.salaryRange.currency} {job.salaryRange.min.toLocaleString()} -{" "}
            {job.salaryRange.max.toLocaleString()}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {job.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-200 text-slate-700 text-xs px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <section className="mt-4">
        <h2 className="text-lg font-semibold mb-2 text-slate-600">
          About the Role
        </h2>
        <p className="text-gray-600 leading-relaxed">{job.description}</p>
      </section>

      {/* Responsibilities */}
      <section className="mt-4 text-slate-600">
        <h2 className="text-lg font-semibold mb-2">Responsibilities</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          {job.responsibilities.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Requirements */}
      <section className="mt-4 text-slate-600">
        <h2 className="text-lg font-semibold mb-2">Requirements</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          {job.requirements.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Skills */}
      <section className="mt-4 text-slate-600">
        <h2 className="text-lg font-semibold mb-2">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-4 text-slate-600">
        <h2 className="text-lg font-semibold mb-2">Benefits</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          {job.benefits.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Footer */}
    </div>
  );
}
