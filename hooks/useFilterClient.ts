"use client";

import { fetchPaginated } from "@/lib/fetcher";
import { useState, useTransition } from "react";

type Meta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

type Filters = Record<string, string | number>;

interface UseFilterClientProps<T> {
  endpoint: string;
  initialData: T[];
  initialMeta: Meta;
  initialFilters?: Filters;
  limit?: number;
}

export function useFilterClient<T>({
  endpoint,
  initialData,
  initialMeta,
  initialFilters = {},
  limit = 10,
}: UseFilterClientProps<T>) {
  const [data, setData] = useState<T[]>(initialData);

  const [meta, setMeta] = useState<Meta>(initialMeta);

  const [filters, setFilters] = useState<Filters>(initialFilters);

  const [isPending, startTransition] = useTransition();

  async function fetchData(params: Filters) {
    const res = await fetchPaginated<T>(endpoint, {
      ...params,
      limit, // ✅ FIX BUG
    });

    setData(res.data);

    setMeta(res.meta);
  }

  function updateFilter(key: string, value: string) {
    const next = {
      ...filters,
      [key]: value,
      page: 1,
    };

    setFilters(next);

    startTransition(() => {
      fetchData(next);
    });
  }

  function changePage(page: number) {
    const next = {
      ...filters,
      page,
    };

    setFilters(next);

    startTransition(() => {
      fetchData(next);
    });
  }

  return {
    data,
    meta,
    filters,
    isPending,
    updateFilter,
    changePage,
  };
}
