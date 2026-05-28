"use client";

import { motion, Variants } from "framer-motion";
import { useState } from "react";
import JobDetail from "./JobDetail";
import Modal from "@/Component/Modal/Modal";
import FilterPill from "@/Component/PillCheckbox/FiterPill";
import SvgArrow from "@/Icon/Arrow";
export const dummyJobsCategory = [
  { value: "Cardiologist", label: "Cardiologist" },
  { value: "Nursing", label: "Nursing" },
];

export interface IDummyJob {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  tags: string[];

  company: {
    name: string;
    logoUrl: string;
    about: string;
  };

  location: string;
  department: string;
  employmentType: "Full-time" | "Part-time" | "Contract";
  workplaceType: "On-site" | "Remote" | "Hybrid";
  experienceLevel: "Junior" | "Mid" | "Senior";

  salaryRange?: {
    min: number;
    max: number;
    currency: string;
  };

  education: string;
  requirements: string[];
  responsibilities: string[];
  skills: string[];
  benefits: string[];

  isUrgent: boolean;
  urgentReason?: string;

  applicantsCount: number;
  postedAt: string;
  deadline: string;
}

export const dummyJobs: IDummyJob[] = [
  {
    id: "job-001",
    title: "Consultant Cardiologist",
    shortDescription:
      "Provide specialized cardiac care in a leading private hospital.",
    description:
      "We are seeking an experienced Consultant Cardiologist to diagnose and manage cardiovascular diseases in our modern facility.",

    tags: ["Full-time", "Senior Level", "On-site", "Cardiologist"],

    company: {
      name: "Harapan Sehat Hospital",
      logoUrl: "/images/company-logo.png",
      about:
        "Harapan Sehat Hospital is a modern healthcare institution providing comprehensive medical services.",
    },

    location: "Jakarta, Indonesia",
    department: "Cardiology",
    employmentType: "Full-time",
    workplaceType: "On-site",
    experienceLevel: "Senior",

    salaryRange: {
      min: 30000000,
      max: 50000000,
      currency: "IDR",
    },

    education: "Spesialis Jantung (Sp.JP)",
    requirements: [
      "Memiliki STR aktif",
      "Minimal 5 tahun pengalaman",
      "Sertifikasi ACLS",
    ],
    responsibilities: [
      "Diagnosis dan perawatan pasien jantung",
      "Melakukan prosedur intervensi",
      "Kolaborasi dengan tim medis",
    ],
    skills: [
      "Cardiac Imaging",
      "ECG Interpretation",
      "Clinical Decision Making",
    ],
    benefits: [
      "Asuransi kesehatan premium",
      "Bonus tahunan",
      "Cuti tahunan 15 hari",
    ],

    isUrgent: true,
    urgentReason: "Immediate replacement due to expansion of cardiac center",

    applicantsCount: 24,
    postedAt: "2026-02-01",
    deadline: "2026-03-01",
  },
  {
    id: "job-002",
    title: "Registered Nurse",
    shortDescription:
      "Deliver compassionate patient care in the inpatient department.",
    description:
      "Responsible for providing professional nursing care to patients in the inpatient unit.",

    tags: ["Full-time", "Shift-based", "Nursing"],

    company: {
      name: "Harapan Sehat Hospital",
      logoUrl: "/images/company-logo.png",
      about:
        "Harapan Sehat Hospital is a modern healthcare institution providing comprehensive medical services.",
    },

    location: "Bandung, Indonesia",
    department: "Inpatient",
    employmentType: "Full-time",
    workplaceType: "On-site",
    experienceLevel: "Mid",

    salaryRange: {
      min: 6000000,
      max: 9000000,
      currency: "IDR",
    },

    education: "S1 Keperawatan + Ners",
    requirements: [
      "STR aktif",
      "Minimal 2 tahun pengalaman",
      "Bersedia kerja shift",
    ],
    responsibilities: [
      "Memberikan asuhan keperawatan",
      "Monitoring kondisi pasien",
      "Kolaborasi dengan dokter",
    ],
    skills: ["Patient Care", "Medical Documentation", "Teamwork"],
    benefits: ["BPJS", "Uang lembur", "Cuti tahunan"],

    isUrgent: false,

    applicantsCount: 12,
    postedAt: "2026-02-05",
    deadline: "2026-03-10",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // smooth easeOut
    },
  }),
};
export default function CareersPage() {
  // const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedData, setSelectedData] = useState<IDummyJob>();
  const [isOpen, setIsopen] = useState<boolean>(false);

  const toggleModal = () => setIsopen((prevState) => !prevState);
  return (
    <main className="bg-linear-to-br from-fuchsia-50 to-teal-50 min-h-screen pt-20">
      <div className="mx-auto max-w-7xl px-4 py-20">
        <Modal
          widthModal="lg"
          isOpen={isOpen}
          title={`Detail Job ${selectedData?.title}`}
          onClose={toggleModal}
          footer={
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="text-sm text-gray-500 text-center lg:text-left">
                {selectedData?.applicantsCount} applicants • Posted{" "}
                {selectedData?.postedAt}
              </div>

              <button className="bg-emerald-600 cursor-pointer text-white px-6 py-2 rounded-xl hover:opacity-90 transition">
                Apply Now
              </button>
            </div>
          }
        >
          <JobDetail job={selectedData as IDummyJob} />
        </Modal>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mb-16"
        >
          {/* Soft Medical Gradient */}
          <div className="absolute right-0 top-0 w-80 h-80 bg-gradient-to-tr from-blue-400 to-teal-300 rounded-full blur-3xl opacity-30 -z-10" />
          <span className="inline-block text-sm px-4 py-1 border border-emerald-800/50 rounded-full mb-6 text-emerald-800/50">
            We’re hiring!
          </span>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-slate-700">
            Join Our Healthcare Mission
          </h1>

          <p className="text-lg text-neutral-600 max-w-2xl">
            Be part of a compassionate team dedicated to excellence in patient
            care. We value teamwork, integrity, and innovation.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 mb-12"
        >
          <FilterPill
            arrPill={[]}
            selected={[]}
            multiple={false}
            onChange={() => {}}
          />
        </motion.div>

        <hr className="border-neutral-300 mb-10" />

        <div className="space-y-10">
          {dummyJobs.map((job, index) => (
            <motion.div
              key={job.title}
              custom={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 transition border-b border-dashed lg:pb-2 md:pb-2 xl:pb-2 pb-1 border-b-slate-400"
            >
              <div>
                <h2 className="text-2xl font-semibold mb-2 text-slate-700">
                  {job.title}
                </h2>
                <p className="text-neutral-600 mb-4">{job.description}</p>

                <div className="flex gap-3 flex-wrap">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm px-3 py-1 border border-slate-500/50 bg-slate-600 rounded-full text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ x: 5 }}
                className="text-lg font-medium pl-2 w-20 text-blue-700 hover:underline flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  setSelectedData(job);
                  toggleModal();
                }}
              >
                Detail
                <SvgArrow />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
