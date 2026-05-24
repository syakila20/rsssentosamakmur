"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useQueryState } from "@/hooks/useQuery";
import FilterPill from "@/Component/PillCheckbox/FiterPill";
import { IOption } from "@/lib/interface";

export default function ArticleFilter({
  categories,
}: {
  categories: IOption[];
}) {
  const { search, category, setSearch, setCategory, isPending } = useQueryState(
    {
      pageKey: "page",
      searchKey: "search",
      categoryKey: "category",
    },
  );

  const [input, setInput] = useState(search);
  const debounced = useDebounce(input, 500);

  // SEARCH SYNC
  useEffect(() => {
    setSearch(debounced);
  }, [debounced]);

  return (
    <div className="mt-4 mb-4 space-y-3">
      {/* SEARCH */}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Cari artikel..."
        className="border p-2 rounded w-full"
      />

      {/* CATEGORY FILTER */}
      <FilterPill
        arrPill={categories}
        selected={category}
        multiple={false}
        onChange={(val) => setCategory(val as string)}
      />

      {isPending && <p className="text-sm text-gray-500 mt-2">Loading...</p>}
    </div>
  );
}
