import { IOption } from "@/types/type";

export function formatDate(
  dateInput: string | Date,
  format: "long" | "short" | "full" | "text" = "text",
): string {
  const date = new Date(dateInput);

  if (isNaN(date.getTime())) {
    return "";
  }

  const day = String(date.getDate()).padStart(2, "0");
  const monthNumber = String(date.getMonth() + 1).padStart(2, "0");
  const monthText = date.toLocaleString("id-ID", { month: "short" });
  const monthLong = date.toLocaleString("id-ID", { month: "long" });
  const yearFull = date.getFullYear();
  const yearShort = String(yearFull).slice(-2);
  const weekday = date.toLocaleString("id-ID", { weekday: "long" });

  switch (format) {
    case "long":
      return `${day}-${monthNumber}-${yearFull}`;

    case "short":
      return `${day}-${monthNumber}-${yearShort}`;
    case "full":
      return `${weekday}, ${day} ${monthLong} ${yearFull}`;

    case "text":
    default:
      return `${day} ${monthText} ${yearFull}`;
  }
}
export function formatTime(time: number) {
  const hour = Math.floor(time / 100)
    .toString()
    .padStart(2, "0");

  const minute = (time % 100).toString().padStart(2, "0");

  return `${hour}:${minute}`;
}

export function timeToMinute(time: string) {
  const [hour, minute] = time.split(":").map(Number);

  return hour * 60 + minute;
}

export function minuteToTime(minute: number) {
  const h = Math.floor(minute / 60)
    .toString()
    .padStart(2, "0");

  const m = (minute % 60).toString().padStart(2, "0");

  return `${h}:${m}`;
}

export const DAYS = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
] as const;

export function getDayName(day: number) {
  return DAYS[day] ?? "Unknown";
}

export function getPromoExpiry(endDate: string | Date, threshold = 7) {
  const now = new Date();
  const target = new Date(endDate);

  const diffMs = target.getTime() - now.getTime();

  if (diffMs <= 0) {
    return {
      isExpired: true,
      isExpiringSoon: false,
      daysLeft: 0,
      label: "Promo telah berakhir",
    };
  }

  const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  let label = `Berakhir dalam ${daysLeft} hari`;

  if (daysLeft === 1) {
    label = "Berakhir besok";
  }

  if (daysLeft === 0) {
    const hoursLeft = Math.ceil(diffMs / (1000 * 60 * 60));

    label = `Berakhir dalam ${hoursLeft} jam`;
  }

  return {
    isExpired: false,
    isExpiringSoon: daysLeft <= threshold,
    daysLeft,
    label,
  };
}

export function getYearOptions(from = 1800, showIndex = true) {
  const currentYear = new Date().getFullYear();

  return [
    ...(showIndex
      ? [
          {
            value: "0",
            label: "Sampai Saat Ini",
          },
        ]
      : []),
    ...Array.from(
      {
        length: currentYear - from + 1,
      },
      (_, i) => {
        const year = currentYear - i;

        return {
          value: year?.toString(),
          label: year.toString(),
        };
      },
    ),
  ];
}

export const DAYSOPTIONS = [
  {
    label: "Senin",
    value: "1",
  },
  {
    label: "Selasa",
    value: "2",
  },
  {
    label: "Rabu",
    value: "3",
  },
  {
    label: "Kamis",
    value: "4",
  },
  {
    label: "Jumat",
    value: "5",
  },
  {
    label: "Sabtu",
    value: "6",
  },
  {
    label: "Minggu",
    value: "7",
  },
];

export function getDayLabel(day: number) {
  return DAYSOPTIONS.find((item) => Number(item.value) === day)?.label ?? "-";
}

export const MINUTES_IN_DAY = 24 * 60;

export const TIME_INTERVAL = 1;

export function getTimeOptions(interval = TIME_INTERVAL): IOption[] {
  const options: IOption[] = [];

  for (let minutes = 0; minutes < MINUTES_IN_DAY; minutes += interval) {
    options.push({
      label: minutesToTime(minutes),
      value: String(minutes),
    });
  }

  return options;
}

export function minutesToTime(minutes: number) {
  const hour = Math.floor(minutes / 60);

  const minute = minutes % 60;

  return `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}`;
}

export function formatTimeRange(start: number, end: number) {
  return `${minutesToTime(start)} - ${minutesToTime(end)}`;
}

export const TIME_OPTIONS: IOption[] = Array.from(
  { length: 24 * 2 }, // setiap 30 menit
  (_, index) => {
    const minutes = index * 30;

    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;

    return {
      value: String(minutes),
      label: `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`,
    };
  },
);
export function timeToMinutes(time: string): number {
  const [hour, minute] = time.split(":").map(Number);

  return hour * 60 + minute;
}
