// type BuildQueryOptions<TFilter extends string = string> = {
//   searchParams: URLSearchParams;

//   // search
//   searchableFields?: string[];

//   // filter (field yang diizinkan dari query)
//   filterableFields?: TFilter[];

//   // sorting
//   sortableFields?: string[];
//   defaultSort?: string;
// };

// type QueryResult = {
//   where: any;
//   skip: number;
//   take: number;
//   orderBy: Record<string, "asc" | "desc">;
//   page: number;
//   limit: number;
// };

// /* =====================================================
//    MAIN BUILDER
// ===================================================== */
// export function buildQuery<TFilter extends string = string>(
//   options: BuildQueryOptions<TFilter>,
// ): QueryResult {
//   const {
//     searchParams,
//     searchableFields = [],
//     filterableFields = [],
//     sortableFields = [],
//     defaultSort = "createdAt",
//   } = options;

//   /* ======================
//      PAGINATION (SAFE)
//   ====================== */
//   const rawPage = Number(searchParams.get("page"));
//   const rawLimit = Number(searchParams.get("limit"));

//   const page = !isNaN(rawPage) && rawPage > 0 ? rawPage : 1;

//   const limit = !isNaN(rawLimit) && rawLimit > 0 ? Math.min(rawLimit, 100) : 10;

//   const skip = (page - 1) * limit;

//   /* ======================
//      SEARCH
//   ====================== */
//   const search = searchParams.get("search")?.trim();

//   const where: any = {};

//   if (search && searchableFields.length > 0) {
//     where.OR = searchableFields.map((field) => ({
//       [field]: {
//         contains: search,
//         mode: "insensitive",
//       },
//     }));
//   }

//   /* ======================
//      FILTER
//   ====================== */
//   filterableFields.forEach((field) => {
//     const value = searchParams.get(field);

//     if (value !== null && value !== "") {
//       where[field] = value;
//     }
//   });

//   /* ======================
//      SORTING (SAFE)
//   ====================== */
//   const sortParam = searchParams.get("sort");
//   const orderParam = searchParams.get("order");

//   const isValidSort = sortParam && sortableFields.includes(sortParam);

//   const sort = isValidSort ? sortParam! : defaultSort;

//   const order: "asc" | "desc" = orderParam === "asc" ? "asc" : "desc";

//   const orderBy = {
//     [sort]: order,
//   };

//   /* ======================
//      RETURN
//   ====================== */
//   return {
//     where,
//     skip,
//     take: limit,
//     orderBy,
//     page,
//     limit,
//   };
// }

// /* =====================================================
//    META BUILDER
// ===================================================== */
// export function buildMeta(total: number, page: number, limit: number) {
//   return {
//     total,
//     page,
//     limit,
//     totalPages: Math.ceil(total / limit),
//   };
// }
