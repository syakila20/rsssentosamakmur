"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useTransition } from "react";

export function useQueryState({
  pageKey,
  searchKey,
  categoryKey,
}: {
  pageKey: string;
  searchKey?: string;
  categoryKey?: string;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const search = searchKey ? (searchParams.get(searchKey) ?? "") : "";
  const category = categoryKey ? (searchParams.get(categoryKey) ?? "") : "";

  function update(params: Record<string, string | number | undefined>) {
    const newParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (!value) newParams.delete(key);
      else newParams.set(key, String(value));
    });

    startTransition(() => {
      router.push(`?${newParams.toString()}`, { scroll: false });
    });
  }

  return {
    search,
    category,
    isPending,
    setSearch: (v: string) =>
      update({
        [searchKey!]: v,
        [pageKey]: 1,
      }),

    setCategory: (v: string) =>
      update({
        [categoryKey!]: v,
        [pageKey]: 1,
      }),
  };
}
