import { buildMeta, buildPagination } from "./pagination";

type BuildQueryOptions = {
  searchParams: URLSearchParams;
  searchableFields?: string[];
  filterableFields?: string[];
  sortableFields?: string[];
  defaultSort?: string;
};

export function buildQuery({
  searchParams,
  searchableFields = [],
  filterableFields = [],
  sortableFields = [],
  defaultSort = "createdAt",
}: BuildQueryOptions) {
  const pagination = buildPagination(searchParams);

  const search = searchParams.get("search");
  const where: Record<string, unknown> = {};

  // ======================
  // SEARCH
  // ======================

  if (search && searchableFields.length > 0) {
    where.OR = searchableFields.map((field) => ({
      [field]: {
        contains: search,
        mode: "insensitive",
      },
    }));
  }

  // ======================
  // FILTER
  // ======================

  for (const field of filterableFields) {
    const value = searchParams.get(field);

    if (value) {
      where[field] = value;
    }
  }

  // ======================
  // SORT
  // ======================

  const requestedSort = searchParams.get("sort");

  const sort = sortableFields.includes(requestedSort || "")
    ? requestedSort!
    : defaultSort;

  const order = searchParams.get("order") === "asc" ? "asc" : "desc";

  return {
    where,

    orderBy: {
      [sort]: order,
    },

    ...pagination,
  };
}
