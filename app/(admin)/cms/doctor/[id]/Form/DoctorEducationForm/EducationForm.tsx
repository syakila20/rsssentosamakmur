"use client";

import { Button } from "@/Component/Button/Button";
import { Input } from "@/Component/Input/Input";
import WrappingInputLabel from "@/Component/WrappingInputLabel/WrappingInputLabel";
import DynamicCard from "../../Component/DynamicCard/DynamicCard";
import { Select } from "@/Component/Select/Select";
import { DoctorEducation, DoctorFormState } from "../../hooks/doctor.reducer";

interface IEducationForm {
  state: DoctorEducation[];
  add: () => void;
  remove: (index: number) => void;
  update: <K extends keyof DoctorEducation>(
    index: number,
    field: K,
    value: DoctorEducation[K],
  ) => void;
}

export default function DoctorEducationForm({
  state,
  update,
  remove,
  add,
}: IEducationForm) {
  const currentYear = new Date().getFullYear();

  const years = Array.from({ length: currentYear - 1800 + 1 }, (_, i) => {
    const year = currentYear - i;
    return {
      value: `${year}`,
      label: `${year}`,
    };
  });

  return (
    <div className="space-y-5">
      {state?.map((item, index) => (
        <DynamicCard key={index} onDelete={() => remove(index)}>
          <div className="grid gap-5 md:grid-cols-2">
            <WrappingInputLabel label="Universitas">
              <Input
                placeholder="Universitas Indonesia"
                value={item?.university}
                onChange={(e) => update(index, "university", e?.target?.value)}
              />
            </WrappingInputLabel>
            <WrappingInputLabel label="Program">
              <Input
                value={item?.program}
                placeholder="Contoh : Urology Residency Program"
                onChange={(e) => update(index, "program", e?.target?.value)}
              />
            </WrappingInputLabel>
            <WrappingInputLabel label="Tahun Lulus">
              <Select
                options={years}
                value={item?.graduationYear?.toString()}
                onChange={(e) => update(index, "graduationYear", Number(e))}
              />
            </WrappingInputLabel>
            <WrappingInputLabel label="Gelar">
              <Input
                placeholder="Contoh : Sp.JP"
                value={item?.degree}
                onChange={(e) => update(index, "degree", e?.target?.value)}
              />
            </WrappingInputLabel>
          </div>
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
