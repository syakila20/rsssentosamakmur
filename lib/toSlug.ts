export const toSlug = (title: string) => {
  return title
    .toLowerCase() // huruf kecil semua
    .trim() // hapus spasi depan/akhir
    .replace(/[^\w\s-]/g, "") // hapus karakter non-alphanumeric kecuali spasi & -
    .replace(/\s+/g, "-") // ganti spasi dengan "-"
    .replace(/\-\-+/g, "-"); // hapus double "-"
};

export const formatSlug = (slug: string) => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
