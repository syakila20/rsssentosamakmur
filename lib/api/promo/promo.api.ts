import { prisma } from "@/lib/prisma";
import { buildMeta } from "@/lib/api/pagination";
import { buildQuery } from "@/lib/query-builder";
import { toPlain } from "@/lib/serialize";

/**
 * GET PROMO CATEGORIES
 */
export async function getPromoCategories() {
  const categories = await prisma.promoCategory.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
    },
  });

  return categories.map((c) => ({
    label: c.name,
    value: c.slug,
  }));
}

/**
 * GET PROMOS (LIST)
 */
export async function getPromos(searchParams: URLSearchParams) {
  const query = buildQuery({
    searchParams,
    searchableFields: ["title", "shortDescription"],
    // filterableFields: {
    //   category: (value) => ({
    //     category: {
    //       slug: value,
    //     },
    //   }),

    //   gender: (value) => ({
    //     gender: value,
    //   }),

    //   active: (value) => ({
    //     isActive: value === "true",
    //   }),
    // },
    filterableFields: {
      category: (value) => ({
        category: {
          slug: value,
        },
      }),
    },
    sortableFields: ["createdAt", "endDate", "startDate", "promoPrice"],
    defaultSort: "createdAt",
  });

  const where = {
    ...query.where,
    isActive: true,
    deletedAt: null,
  };

  const [data, total] = await Promise.all([
    prisma.promo.findMany({
      where,
      skip: query.skip,
      take: query.take,
      orderBy: query.orderBy,

      select: {
        id: true,
        title: true,
        slug: true,
        shortDescription: true,
        image: true,

        startDate: true,
        endDate: true,

        gender: true,
        minAge: true,
        maxAge: true,

        originalPrice: true,
        promoPrice: true,
        discountPercent: true,

        isFeatured: true,

        category: {
          select: {
            name: true,
            slug: true,
          },
        },

        _count: {
          select: {
            benefits: true,
          },
        },
      },
    }),

    prisma.promo.count({ where }),
  ]);

  return {
    data: toPlain(data),
    meta: buildMeta(query.page, query.limit, total),
  };
}

/**
 * GET PROMO BY SLUG (DETAIL)
 */
export async function getPromoBySlug(slug: string) {
  const promo = await prisma.promo.findFirst({
    where: {
      slug,
      isActive: true,
      deletedAt: null,
    },

    select: {
      id: true,
      title: true,
      slug: true,

      shortDescription: true,
      description: true,
      image: true,

      startDate: true,
      endDate: true,

      gender: true,
      minAge: true,
      maxAge: true,

      originalPrice: true,
      promoPrice: true,
      discountPercent: true,

      patientRecommendation: true,
      preparation: true,
      termsCondition: true,

      category: {
        select: {
          name: true,
          slug: true,
        },
      },

      benefits: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });

  if (!promo) {
    throw new Error("PROMO_NOT_FOUND");
  }

  return promo;
}

/**
 * GET FEATURED PROMOS
 */
export async function getFeaturedPromos(limit = 5) {
  return prisma.promo.findMany({
    where: {
      isActive: true,
      isFeatured: true,
      deletedAt: null,
    },

    take: limit,

    orderBy: {
      createdAt: "desc",
    },

    select: {
      id: true,
      title: true,
      slug: true,
      shortDescription: true,
      image: true,

      startDate: true,
      endDate: true,

      promoPrice: true,
      originalPrice: true,
      discountPercent: true,

      category: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  });
}

/**
 * GET ACTIVE PROMOS (HOMEPAGE / CARD GRID)
 */
export async function getActivePromos(limit = 8) {
  return prisma.promo.findMany({
    where: {
      isActive: true,
      deletedAt: null,

      endDate: {
        gte: new Date(), // masih berlaku
      },
    },

    take: limit,

    orderBy: {
      endDate: "asc", // yang mau habis muncul dulu (good UX "Segera Berakhir")
    },

    select: {
      id: true,
      title: true,
      slug: true,
      shortDescription: true,
      image: true,

      endDate: true,
      startDate: true,

      promoPrice: true,
      originalPrice: true,
      discountPercent: true,

      category: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  });
}
