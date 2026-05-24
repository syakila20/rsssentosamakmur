// import { prisma } from "@/lib/prisma";
// import { buildQuery } from "@/lib/api/query-builder";
// import { buildMeta } from "@/lib/api/pagination";
// import { apiResponse } from "@/lib/api/response";

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const query = buildQuery({
//     searchParams,
//     searchableFields: ["title", "excerpt"],
//     filterableFields: ["category"],
//     sortableFields: ["createdAt", "title"],
//     defaultSort: "createdAt",
//   });

//   const where = {
//     ...query.where,

//     published: true,
//   };

//   const [articles, total] = await Promise.all([
//     prisma.article.findMany({
//       where,
//       skip: query.skip,
//       take: query.take,
//       orderBy: query.orderBy,

//       select: {
//         id: true,
//         title: true,
//         slug: true,
//         excerpt: true,
//         category: true,
//         thumbnail: true,
//         createdAt: true,
//       },
//     }),

//     prisma.article.count({
//       where,
//     }),
//   ]);

//   return apiResponse(
//     articles,

//     buildMeta(total, query.page, query.limit),
//   );
// }
import { getArticles } from "@/lib/api/article/article.services";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const result = await getArticles(searchParams);

  return NextResponse.json(result);
}
