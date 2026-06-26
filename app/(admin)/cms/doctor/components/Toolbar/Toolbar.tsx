/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/Component/Button/Button";
import InputWithButton from "@/Component/Input/InputWithButton";
import Popover from "@/Component/Popover/Popover";
import { Select } from "@/Component/Select/Select";
import Toolbar from "@/Component/Toolbar/Toolbars";
import WrappingInputLabel from "@/Component/WrappingInputLabel/WrappingInputLabel";
import SvgFilter from "@/Icon/Filter";
import SvgPlus from "@/Icon/Plus";
import { IOption } from "@/types/type";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
interface IToolbarDoctor {
  onSearch: (val: string) => void;
  optionCategory?: IOption[];
  onApplyFilter?: (cat: string, status: string) => void;
}

const enumStatus = [
  {
    label: "Aktif",
    value: "1",
  },
  {
    label: "Non Aktif",
    value: "0",
  },
];

const ToolbarDoctor: React.FC<IToolbarDoctor> = (props) => {
  const [keyword, setKeyword] = useState<string>();
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const router = useRouter();

  const onClickSearch = () => {
    if (!keyword?.trim()) {
      setErrorMsg("");
      props?.onSearch?.("");
      return;
    }

    if (keyword.length < 3) {
      setErrorMsg("Minimal 3 karakter untuk melakukan pencarian");
      return;
    }

    setErrorMsg("");
    props?.onSearch?.(keyword);
  };

  const onApplyFilter = () => {
    props.onApplyFilter?.(category, status as string);
  };

  return (
    <Toolbar
      title="List Doktor"
      showSearch
      action={
        <div className="flex items-start gap-2">
          <div className="flex flex-col">
            <InputWithButton
              size="sm"
              value={keyword || ""}
              onChangeValue={(e) => setKeyword(e.target.value)}
              onSubmit={onClickSearch}
            />
            {errorMsg && (
              <p className="mt-1 text-xs text-red-500">{errorMsg}</p>
            )}
          </div>

          <Popover>
            <Popover.Trigger>
              <button
                type="button"
                className="
    flex
    h-9
    w-9
    items-center
    justify-center
    rounded-md
    bg-emerald-600
    text-white
    hover:bg-emerald-700
  "
              >
                <SvgFilter height="16" />
              </button>
            </Popover.Trigger>

            <Popover.Content
              title="Filter Dokter"
              width="w-96"
              footer={
                <div className="border-t border-slate-100 py-4 flex  gap-2">
                  <Button shape="normal" variant="outline" className="w-full">
                    Cancel
                  </Button>
                  <Button
                    onClick={onApplyFilter}
                    shape="normal"
                    variant="primary"
                    className="w-full"
                  >
                    Terapkan
                  </Button>
                </div>
              }
            >
              <div className="flex flex-col gap-4">
                <WrappingInputLabel label="Pilih Kategori">
                  <Select
                    options={props?.optionCategory as []}
                    placeholder="Pilih Spesialis"
                    value={category}
                    onChange={(val) => setCategory(val as string)}
                  />
                </WrappingInputLabel>
                <WrappingInputLabel label="Pilih Status">
                  <Select
                    options={enumStatus as []}
                    placeholder="Pilih Status"
                    value={status}
                    onChange={(val) => setStatus(val as any)}
                  />
                </WrappingInputLabel>
              </div>
            </Popover.Content>
          </Popover>
          <Button
            variant="secondary"
            shape="full"
            size="sm"
            icon={<SvgPlus className="shrink-0" height="20" />}
            onClick={() => router.push("/cms/doctor/tambah")}
          >
            Doktor
          </Button>
        </div>
      }
    />
  );
};

export default ToolbarDoctor;
