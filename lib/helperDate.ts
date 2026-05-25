export function formatDate(
  dateInput: string | Date,
  format: "long" | "short" | "text" = "text",
): string {
  const date = new Date(dateInput);

  if (isNaN(date.getTime())) {
    return "";
  }

  const day = String(date.getDate()).padStart(2, "0");
  const monthNumber = String(date.getMonth() + 1).padStart(2, "0");
  const monthText = date.toLocaleString("en-US", { month: "short" });
  const yearFull = date.getFullYear();
  const yearShort = String(yearFull).slice(-2);

  switch (format) {
    case "long":
      return `${day}-${monthNumber}-${yearFull}`;

    case "short":
      return `${day}-${monthNumber}-${yearShort}`;

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
