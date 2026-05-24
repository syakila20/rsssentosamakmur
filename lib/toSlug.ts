export const toSlug = (title: string) => {
  return title
    .toLowerCase() // huruf kecil semua
    .trim() // hapus spasi depan/akhir
    .replace(/[^\w\s-]/g, "") // hapus karakter non-alphanumeric kecuali spasi & -
    .replace(/\s+/g, "-") // ganti spasi dengan "-"
    .replace(/\-\-+/g, "-"); // hapus double "-"
};
