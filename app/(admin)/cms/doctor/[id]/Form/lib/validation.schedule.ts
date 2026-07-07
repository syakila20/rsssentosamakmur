const DAY_LABEL: Record<number, string> = {
  1: "Senin",
  2: "Selasa",
  3: "Rabu",
  4: "Kamis",
  5: "Jumat",
  6: "Sabtu",
  7: "Minggu",
};

export interface IScheduleValidation {
  day: number | null;
  startTime: number | null;
  endTime: number | null;
}

export function validateScheduleTime(schedule: IScheduleValidation) {
  const { startTime, endTime } = schedule;

  if (startTime == null || endTime == null) {
    return null;
  }

  if (endTime <= startTime) {
    return "Jam selesai harus lebih besar dari jam mulai.";
  }

  return null;
}

export function isTimeOverlap(
  startA: number,
  endA: number,
  startB: number,
  endB: number,
) {
  return startA < endB && endA > startB;
}

export function validateScheduleOverlap(schedules: IScheduleValidation[]) {
  const grouped = new Map<number, IScheduleValidation[]>();

  for (const schedule of schedules) {
    if (
      schedule.day == null ||
      schedule.startTime == null ||
      schedule.endTime == null
    ) {
      continue;
    }

    if (!grouped.has(schedule.day)) {
      grouped.set(schedule.day, []);
    }

    grouped.get(schedule.day)!.push(schedule);
  }

  for (const [day, items] of grouped.entries()) {
    const sorted = [...items].sort((a, b) => a.startTime! - b.startTime!);

    for (let i = 1; i < sorted.length; i++) {
      const previous = sorted[i - 1];
      const current = sorted[i];

      if (
        isTimeOverlap(
          previous.startTime!,
          previous.endTime!,
          current.startTime!,
          current.endTime!,
        )
      ) {
        return `Jadwal hari ${DAY_LABEL[day]} bertabrakan.`;
      }
    }
  }

  return null;
}
