/* eslint-disable @typescript-eslint/no-explicit-any */
type QueryParams = {
  searchParams: URLSearchParams;
  searchableFields?: string[];
  filterableFields?: string[];
  defaultSort?: string;
};

export function buildQuery({
  searchParams,
  searchableFields = [],
  filterableFields = [],
  defaultSort = "createdAt",
}: QueryParams) {
  // ======================
  // PAGINATION
  // ======================
  const page = Number(searchParams.get("page")) || 1;
  const limit = Math.min(Number(searchParams.get("limit")) || 10, 100);
  const skip = (page - 1) * limit;

  // ======================
  // SEARCH
  // ======================
  const search = searchParams.get("search") || "";

  const where: any = {};

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
  filterableFields.forEach((field) => {
    const value = searchParams.get(field);
    if (value) {
      where[field] = value;
    }
  });

  // ======================
  // SORTING
  // ======================
  const sort = searchParams.get("sort") || defaultSort;
  const order = searchParams.get("order") === "asc" ? "asc" : "desc";

  const orderBy = {
    [sort]: order,
  };

  return {
    where,
    skip,
    take: limit,
    page,
    limit,
    orderBy,
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
