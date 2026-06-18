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
