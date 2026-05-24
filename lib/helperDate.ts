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
