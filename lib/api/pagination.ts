export function buildPagination(searchParams: URLSearchParams) {
  const page = Math.max(Number(searchParams.get("page")) || 1, 1);

  const limit = Math.min(Number(searchParams.get("limit")) || 10, 100);

  const skip = (page - 1) * limit;

  return {
    page,
    limit,
    skip,
    take: limit,
  };
}

export function buildMeta(total: number, page: number, limit: number) {
  const totalPages = Math.ceil(total / limit);

  return {
    total,
    page,
    limit,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}
