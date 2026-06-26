"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useTransition } from "react";

export function useQueryServer({
  pageKey,
  searchKey,
  categoryKey,
  statusKey,
}: {
  pageKey: string;
  searchKey?: string;
  categoryKey?: string;
  statusKey?: string;
}) {
  const pathname = usePathname();

  const searchParams = useSearchParams();

  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const search = searchKey ? (searchParams.get(searchKey) ?? "") : "";

  const category = categoryKey ? (searchParams.get(categoryKey) ?? "") : "";
  const status = statusKey ? (searchParams.get(statusKey) ?? "") : "";

  function update(params: Record<string, string | number | undefined | null>) {
    const newParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        newParams.delete(key);
      } else {
        newParams.set(key, String(value));
      }
    });

    startTransition(() => {
      router.push(`${pathname}?${newParams.toString()}`, {
        scroll: false,
      });
    });
  }

  function setSearch(v: string) {
    if (!searchKey) return;

    update({
      [searchKey]: v,
      [pageKey]: 1,
    });
  }

  function setCategory(v: string) {
    if (!categoryKey) return;

    update({
      [categoryKey]: v,
      [pageKey]: 1,
    });
  }

  function setStatus(v: string) {
    if (!statusKey) return;

    update({
      [statusKey]: v,
      [pageKey]: 1,
    });
  }

  function setPage(page: number) {
    update({
      [pageKey]: page,
    });
  }

  return {
    search,
    category,
    isPending,
    setSearch,
    setCategory,
    setPage,
    status,
    setStatus,
  };
}
