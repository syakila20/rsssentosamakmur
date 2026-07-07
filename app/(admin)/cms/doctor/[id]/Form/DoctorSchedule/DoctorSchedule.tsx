"use client";

import { Button } from "@/Component/Button/Button";
import { Input } from "@/Component/Input/Input";
import WrappingInputLabel from "@/Component/WrappingInputLabel/WrappingInputLabel";
import DynamicCard from "../../Component/DynamicCard/DynamicCard";
import { Select } from "@/Component/Select/Select";
import { DAYSOPTIONS, minutesToTime, timeToMinutes } from "@/lib/helperDate";
import { DoctorSchedule } from "../../hooks/doctor.reducer";
import { validateScheduleTime } from "../lib/validation.schedule";

interface IDoctorScheduleForm {
  state: DoctorSchedule[];
  add: () => void;
  remove: (index: number) => void;
  update: <K extends keyof DoctorSchedule>(
    index: number,
    field: K,
    value: DoctorSchedule[K],
  ) => void;
}

export default function DoctorScheduleForm({
  state,
  add,
  remove,
  update,
}: IDoctorScheduleForm) {
  return (
    <div className="space-y-5">
      {state.map((item, index) => {
        const error = validateScheduleTime(item);
        return (
          <DynamicCard key={index} onDelete={() => remove(index)}>
            <div className="grid gap-5 md:grid-cols-3">
              <WrappingInputLabel label="Hari">
                <Select
                  options={DAYSOPTIONS}
                  value={item.day?.toString()}
                  onChange={(value) => update(index, "day", Number(value))}
                />
              </WrappingInputLabel>

              <WrappingInputLabel label="Jam Mulai">
                <Input
                  type="time"
                  value={
                    item.startTime !== null ? minutesToTime(item.startTime) : ""
                  }
                  onChange={(e) =>
                    update(index, "startTime", timeToMinutes(e.target.value))
                  }
                />
              </WrappingInputLabel>

              <WrappingInputLabel label="Jam Selesai">
                <Input
                  type="time"
                  value={
                    item.endTime !== null ? minutesToTime(item.endTime) : ""
                  }
                  onChange={(e) =>
                    update(index, "endTime", timeToMinutes(e.target.value))
                  }
                />
              </WrappingInputLabel>
            </div>
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          </DynamicCard>
        );
      })}

      <Button
        type="button"
        variant="outline"
        className="w-full border-dashed"
        onClick={add}
      >
        + Tambah Jadwal Praktik
      </Button>
    </div>
  );
}
