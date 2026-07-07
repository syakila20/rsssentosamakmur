import { ImageUpload } from "@/Component/ImageUpload/ImageUpload";
import { Input } from "@/Component/Input/Input";
import { Select } from "@/Component/Select/Select";
import WrappingInputLabel from "@/Component/WrappingInputLabel/WrappingInputLabel";
import { IOption } from "@/types/type";
import React from "react";
import { DoctorFormState } from "../../hooks/doctor.reducer";
import { useThumbnailUpload } from "@/hooks/useUploadThumbnail";

interface IBasicForm {
  categories: IOption[];
  state: DoctorFormState;
  updateField: <K extends keyof DoctorFormState>(
    field: K,
    value: DoctorFormState[K],
  ) => void;
  thumbnail: ReturnType<typeof useThumbnailUpload>;
}

export const BasicForm = ({
  categories,
  updateField,
  state,
  thumbnail,
}: IBasicForm) => {
  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="space-y-5 lg:col-span-8">
        <WrappingInputLabel label="Nama Dokter">
          <Input
            placeholder="Nama dokter"
            onChange={(e) => updateField("name", e.target.value)}
          />
        </WrappingInputLabel>

        <WrappingInputLabel label="Spesialis">
          <Select
            value={state?.specialtyId}
            options={categories}
            placeholder="Pilih spesialis"
            onChange={(e) => updateField("specialtyId", e as string)}
          />
        </WrappingInputLabel>

        <WrappingInputLabel label="Email">
          <Input
            placeholder="doctor@email.com"
            onChange={(e) => updateField("email", e?.target?.value)}
          />
        </WrappingInputLabel>

        <WrappingInputLabel label="Nomor Telepon">
          <Input
            placeholder="08123456789"
            onChange={(e) => updateField("phoneNumber", e?.target?.value)}
          />
        </WrappingInputLabel>
      </div>

      <div className="lg:col-span-4">
        <ImageUpload
          preview={thumbnail.preview}
          onChange={thumbnail.onChange}
          onDelete={() => thumbnail.deleteImage(state.imagePublicId)}
        />
      </div>
    </div>
  );
};
