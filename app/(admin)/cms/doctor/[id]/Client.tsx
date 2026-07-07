"use client";
import React, { useEffect, useState } from "react";
import AdminPage from "@/app/(admin)/AdminPage";
import Accordion from "@/Component/Accordion/Accordion";
import WrappingInputLabel from "@/Component/WrappingInputLabel/WrappingInputLabel";
import { Input } from "@/Component/Input/Input";
import { Select } from "@/Component/Select/Select";
import { ImageUpload } from "@/Component/ImageUpload/ImageUpload";
import { Button } from "@/Component/Button/Button";
import { IOption } from "@/types/type";
import { BasicForm } from "./Form/DoctorBasicForm/BasicForm";
import { useDoctorForm } from "./hooks/useDoctorForm";
import { useThumbnailUpload } from "@/hooks/useUploadThumbnail";
import DoctorEducationForm from "./Form/DoctorEducationForm/EducationForm";
import DoctorExperienceForm from "./Form/DoctorExperience/DoctorExperience";
import DoctorScheduleForm from "./Form/DoctorSchedule/DoctorSchedule";

interface IDetailDoctor {
  categories: IOption[];
}
export const DOCTOR_SECTIONS = {
  BASIC: "basic",
  EDUCATION: "education",
  EXPERIENCE: "experience",
  SCHEDULE: "schedule",
} as const;

export type DoctorSection =
  (typeof DOCTOR_SECTIONS)[keyof typeof DOCTOR_SECTIONS];

const DetailDoctor: React.FC<IDetailDoctor> = ({ categories }) => {
  const [accordion, setAccordion] = useState<Record<DoctorSection, boolean>>({
    basic: true,
    education: false,
    experience: false,
    schedule: false,
  });

  const toggleAccordion = (key: keyof typeof accordion) => (open: boolean) => {
    setAccordion((prev) => ({
      ...prev,
      [key]: open,
    }));
  };

  const doctor = useDoctorForm();
  const thumbnail = useThumbnailUpload({
    value: doctor.state.image,
    onUploaded: (url, publicId) => {
      doctor.updateField("image", url);
      doctor.updateField("imagePublicId", publicId);
    },
  });
  return (
    <AdminPage
      title="Doktor"
      footerLeftActions={[
        <Button shape="full" key="cancel" variant="outline">
          Cancel
        </Button>,
      ]}
      footerRightActions={[
        <Button
          onClick={doctor?.submit}
          key="submit"
          shape="full"
          variant="secondary"
        >
          Submit
        </Button>,
      ]}
    >
      <span className="text-slate-600 w-100">
        {JSON?.stringify(doctor?.state)}
      </span>
      <Accordion
        title="Informasi Dasar"
        open={accordion.basic}
        onOpenChange={toggleAccordion("basic")}
      >
        <BasicForm
          categories={categories}
          state={doctor.state}
          updateField={doctor.updateField}
          thumbnail={thumbnail}
        />
      </Accordion>

      <Accordion
        title={`Pendidikan ${doctor?.education?.state?.length || 0}`}
        open={accordion.education}
        onOpenChange={toggleAccordion("education")}
      >
        <DoctorEducationForm
          state={doctor.education?.state}
          update={doctor.education?.update}
          add={doctor?.education.add}
          remove={(id) => doctor?.education?.remove(id)}
        />
      </Accordion>

      <Accordion
        title="Pengalaman"
        open={accordion.experience}
        onOpenChange={toggleAccordion("experience")}
      >
        <DoctorExperienceForm
          state={doctor.experience?.state}
          update={doctor.experience?.update}
          add={doctor?.experience.add}
          remove={(id) => doctor?.experience?.remove(id)}
        />
      </Accordion>

      <Accordion
        title="Jadwal Praktik"
        open={accordion.schedule}
        onOpenChange={toggleAccordion("schedule")}
      >
        <DoctorScheduleForm
          state={doctor.schedule?.state}
          update={doctor.schedule?.update}
          add={doctor?.schedule.add}
          remove={(id) => doctor?.schedule?.remove(id)}
        />
      </Accordion>
    </AdminPage>
  );
};

export default DetailDoctor;
//   <Accordion title="Informasi Dasar" defaultOpen>
//
//   </Accordion>

//   {/* ===================== */}
//   {/* Jadwal */}
//   {/* ===================== */}

//   <Accordion
//     title="Jadwal Praktik"
//     rightAction={
//       <Button variant="outline" size="sm">
//         Tambah Jadwal
//       </Button>
//     }
//   >
//     <div className="text-slate-500 text-sm">Belum ada jadwal praktik.</div>
//   </Accordion>

//   {/* ===================== */}
//   {/* Pendidikan */}
//   {/* ===================== */}

//   <Accordion
//     title="Pendidikan"
//     rightAction={
//       <Button variant="outline" size="sm">
//         Tambah Pendidikan
//       </Button>
//     }
//   >
//     <div className="text-slate-500 text-sm">
//       Belum ada riwayat pendidikan.
//     </div>
//   </Accordion>

//   {/* ===================== */}
//   {/* Pengalaman */}
//   {/* ===================== */}

//   <Accordion
//     title="Pengalaman"
//     rightAction={
//       <Button variant="outline" size="sm">
//         Tambah Pengalaman
//       </Button>
//     }
//   >
//     <div className="text-slate-500 text-sm">
//       Belum ada pengalaman kerja.
//     </div>
//   </Accordion>
