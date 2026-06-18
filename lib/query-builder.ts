/* eslint-disable @typescript-eslint/no-explicit-any */

import { BuildQueryOptions } from "@/types/type";
import { buildPagination } from "./api/pagination";

export function buildQuery<TWhere extends Record<string, unknown>>({
  searchParams,
  searchableFields = [],
  filterableFields = [],
  sortableFields = [],
  defaultSort = "createdAt",
}: BuildQueryOptions<TWhere>) {
  const { page, limit, skip, take } = buildPagination(searchParams);

  const search = searchParams.get("search");

  const where: TWhere = {} as TWhere;

  // ======================
  // SEARCH
  // ======================
  if (search && searchableFields.length) {
    (where as any).OR = searchableFields.map((field) => ({
      [field]: {
        contains: search,
      },
    }));
  }

  // ======================
  // FILTER
  // ======================
  if (Array.isArray(filterableFields)) {
    for (const field of filterableFields) {
      const value = searchParams.get(field);

      if (value) {
        (where as any)[field] = value;
      }
    }
  } else {
    for (const [field, mapper] of Object.entries(filterableFields)) {
      const value = searchParams.get(field);

      if (!value) continue;

      Object.assign(where, mapper(value));
    }
  }

  // ======================
  // SORT
  // ======================
  const sort = searchParams.get("sort");

  const order = searchParams.get("order") === "asc" ? "asc" : "desc";

  const finalSort = sortableFields.includes(sort || "") ? sort! : defaultSort;

  return {
    where,
    page,
    limit,
    skip,
    take,
    orderBy: {
      [finalSort]: order,
    },
  };
}

export function buildMeta(total: number, page: number, limit: number) {
  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}
