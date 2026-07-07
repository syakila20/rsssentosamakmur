"use client";

import { Button } from "@/Component/Button/Button";
import { Input } from "@/Component/Input/Input";
import WrappingInputLabel from "@/Component/WrappingInputLabel/WrappingInputLabel";
import DynamicCard from "../../Component/DynamicCard/DynamicCard";
import { Select } from "@/Component/Select/Select";
import {
  DoctorEducation,
  DoctorExperience,
  DoctorFormState,
} from "../../hooks/doctor.reducer";
import ArticleEditor from "@/app/(admin)/cms/artikel/Components/Editor/ArticleEditor";
import { getYearOptions } from "@/lib/helperDate";

interface IExperienceForm {
  state: DoctorExperience[];
  add: () => void;
  remove: (index: number) => void;
  update: <K extends keyof DoctorExperience>(
    index: number,
    field: K,
    value: DoctorExperience[K],
  ) => void;
}

export default function DoctorExperienceForm({
  state,
  update,
  remove,
  add,
}: IExperienceForm) {
  return (
    <div className="space-y-5">
      {state?.map((item, index) => (
        <DynamicCard key={index} onDelete={() => remove(index)}>
          <div className="grid gap-4 md:grid-cols-2">
            <WrappingInputLabel label="Posisi">
              <Input
                placeholder="Posisi"
                value={item?.title}
                onChange={(e) => update(index, "title", e?.target?.value)}
              />
            </WrappingInputLabel>
            <WrappingInputLabel label="Tempat Kerja">
              <Input
                value={item?.place}
                placeholder="Nama Tempat Bekerja"
                onChange={(e) => update(index, "place", e?.target?.value)}
              />
            </WrappingInputLabel>
            <WrappingInputLabel label="Tahun Masuk">
              <Select
                options={getYearOptions(1800, false)}
                value={item?.startYear?.toString()}
                onChange={(e) => update(index, "startYear", Number(e))}
              />
            </WrappingInputLabel>
            <WrappingInputLabel label="Tahun Selesai">
              <Select
                options={getYearOptions()}
                value={item?.endYear?.toString()}
                onChange={(e) => update(index, "endYear", Number(e))}
              />
            </WrappingInputLabel>
          </div>
          <WrappingInputLabel label="Deskripsi Pekerjaan">
            <div className="h-70 overflow-y-scroll">
              <ArticleEditor
                value={
                  item?.descriptionJson
                    ? JSON.parse(item?.descriptionJson)
                    : undefined
                }
                onChange={(json, html) => {
                  update(index, "descriptionJson", JSON.stringify(json));
                  update(index, "description", html);
                }}
              />
            </div>
          </WrappingInputLabel>
        </DynamicCard>
      ))}

      <Button
        type="button"
        variant="outline"
        className="w-full border-dashed"
        onClick={add}
      >
        + Tambah Pendidikan
      </Button>
    </div>
  );
}
