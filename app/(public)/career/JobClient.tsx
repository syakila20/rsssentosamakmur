"use client";
import Modal from "@/Component/Modal/Modal";
import { useQueryServer } from "@/hooks/useQuery";
import { formatDate } from "@/lib/helperDate";
import { ApiMeta, IJobCard, IOption } from "@/types/type";
import { motion, Variants } from "framer-motion";
import React, { useState } from "react";
import FilterPill from "@/Component/PillCheckbox/FiterPill";
import SvgArrow from "@/Icon/Arrow";
import JobDetail from "./JobDetail";
import LinkBack from "@/Component/LinkBack/LinkBack";
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

interface JobsClientProps {
  initialData: IJobCard[];
  initialMeta: ApiMeta;
  categories: IOption[];
}
export default function JobsClient({
  initialData,
  initialMeta,
  categories,
}: JobsClientProps) {
  const { category, isPending, setCategory, setPage } = useQueryServer({
    pageKey: "page",
    categoryKey: "category",
  });

  const [selectedData, setSelectedData] = useState<IJobCard>();
  const [isOpen, setIsopen] = useState<boolean>(false);

  const toggleModal = () => setIsopen((prevState) => !prevState);

  return (
    <>
      <Modal
        widthModal="xl"
        isOpen={isOpen}
        title={`Detail Lowongan : ${selectedData?.title as string}`}
        onClose={toggleModal}
        footer={
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="text-sm text-gray-500 text-center lg:text-left">
              {selectedData?._count?.applicants} applicants • Posted{" "}
              {formatDate(selectedData?.deadline as Date, "short")}
            </div>

            <button className="bg-emerald-600 cursor-pointer text-white px-6 py-2 rounded-xl hover:opacity-90 transition">
              Apply Now
            </button>
          </div>
        }
      >
        <JobDetail job={selectedData as IJobCard} />
      </Modal>
      <main className="bg-linear-to-br from-fuchsia-50 to-teal-50 min-h-screen pt-20">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative mb-16"
          >
            <div className="absolute right-0 top-0 w-80 h-80 bg-linear-to-tr from-blue-400 to-teal-300 rounded-full blur-3xl opacity-30 -z-10" />
            <LinkBack
              title={
                <span className="inline-block text-sm px-4 py-1 border border-emerald-800/50 rounded-full text-emerald-800/50">
                  Lowongan Pekerjaan
                </span>
              }
              linkTo="/"
            />

            <h2 className="text-3xl md:text-3xl font-bold mb-6 leading-tight text-slate-700">
              Bergabunglah dengan Tim Profesional Kami
            </h2>

            <p className="text-lg text-neutral-600">
              Berkarya dalam lingkungan kerja yang mengutamakan pelayanan
              pasien, profesionalisme, integritas, dan inovasi. Bersama kami,
              Anda dapat mengembangkan karier sekaligus memberikan kontribusi
              nyata bagi kesehatan masyarakat.
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
            {initialData.map((job, index) => (
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
                  <p className="text-neutral-600 mb-4">
                    {job?.shortDescription}
                  </p>

                  <div className="flex gap-3 flex-wrap">
                    {job?.skills?.map((tag, key) => (
                      <span
                        key={tag?.skill?.id}
                        className="text-sm px-3 py-1 border border-slate-500/50 bg-slate-600 rounded-full text-white"
                      >
                        {tag?.skill?.name}
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
    </>
  );
}
