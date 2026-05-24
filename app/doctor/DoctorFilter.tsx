"use client";

import { usePagination } from "@/hooks/usePagination";

export default function DoctorFilter() {
  const { search, filters, handleSearchChange, handleFilterChange } =
    usePagination();

  return (
    <div className="flex gap-4 flex-wrap">
      <input
        type="text"
        defaultValue={search}
        onChange={(e) => handleSearchChange(e.target.value)}
        placeholder="Cari dokter..."
        className="border p-2 rounded"
      />

      <select
        value={filters.specialty ?? ""}
        onChange={(e) => handleFilterChange("specialty", e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">Semua Spesialis</option>
        <option value="spesialis-jantung">Spesialis Jantung</option>
        <option value="spesialis-anak">Spesialis Anak</option>
      </select>

      <select
        value={filters.sort ?? ""}
        onChange={(e) => handleFilterChange("sort", e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">Terbaru</option>
        <option value="rating_desc">Rating Tertinggi</option>
        <option value="rating_asc">Rating Terendah</option>
      </select>
    </div>
  );
}
