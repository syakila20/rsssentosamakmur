"use client";

import { useState, useTransition } from "react";
import { apiClient } from "@/lib/client/api-client";

type Meta = {
  page: number;
  totalPages: number;
  total: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

interface Params<T> {
  endpoint: string;
  initialData: T[];
  initialFilters?: Record<string, string>;
  limit?: number;
  initialMeta?: Meta;
}

export function useFilterClient<T>({
  endpoint,
  initialData,
  initialFilters = {},
  limit = 10,
  initialMeta,
}: Params<T>) {
  const [data, setData] = useState<T[]>(initialData);
  const [filters, setFilters] = useState(initialFilters);
  const [meta, setMeta] = useState<Meta | null>(initialMeta ?? null);

  const [isPending, startTransition] = useTransition();

  function updateFilter(key: string, value: string) {
    const next = {
      ...filters,
      [key]: value,
      page: "1", // reset pagination saat filter berubah
    };

    setFilters(next);

    startTransition(async () => {
      const res = await apiClient<{
        data: T[];
        meta: Meta;
      }>(endpoint, {
        params: {
          ...next,
          limit,
        },
      });

      setData(res.data);
      setMeta(res.meta);
    });
  }

  function changePage(page: number) {
    const next = {
      ...filters,
      page: String(page),
    };

    setFilters(next);

    startTransition(async () => {
      const res = await apiClient<{
        data: T[];
        meta: Meta;
      }>(endpoint, {
        params: {
          ...next,
          limit,
        },
      });

      setData(res.data);
      setMeta(res.meta);
    });
  }

  return {
    data,
    filters,
    meta,
    updateFilter,
    changePage,
    isPending,
  };
}
