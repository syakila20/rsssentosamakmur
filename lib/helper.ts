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

type ParsedSlugId = {
  slug: string;
  id: number;
};

export function parseSlugId(value: string): ParsedSlugId;

export function parseSlugId(value: string[]): ParsedSlugId[];

export function parseSlugId(value: string | string[]) {
  const parse = (item: string): ParsedSlugId => {
    const [slug = "", rawId = "0"] = item.split("_");

    return {
      slug,
      id: Number(rawId),
    };
  };

  return Array.isArray(value) ? value.map(parse) : parse(value);
}
