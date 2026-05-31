export function formatRupiah(value: number, withPrefix = true) {
  return new Intl.NumberFormat("id-ID", {
    style: withPrefix ? "currency" : "decimal",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatSalary(min?: number | null, max?: number | null) {
  if (!min || !max) {
    return "Gaji kompetitif";
  }

  return `${formatRupiah(min)} - ${formatRupiah(max)}`;
}
