import { prisma } from "@/lib/prisma";
import { buildMeta } from "@/lib/api/pagination";
import { buildQuery } from "@/lib/query-builder";
import { IDoctorCard } from "@/types/type";

type DoctorFilters = {
  specialty?: {
    slug?: string;
  };
  isActive?: boolean;
};

export async function getDoctors(searchParams: URLSearchParams) {
  const query = buildQuery<DoctorFilters>({
    searchParams,
    searchableFields: ["name"],
    filterableFields: {
      category: (value) => ({
        specialty: {
          slug: value,
        },
      }),
      isActive: (value) => ({
        isActive: value === "1",
      }),
    },
    sortableFields: ["createdAt"],
    defaultSort: "createdAt",
  });

  const where = {
    ...query.where,
  };

  const [data, total] = await Promise.all([
    prisma.doctor.findMany({
      where,
      skip: query.skip,
      take: query.take,
      orderBy: query.orderBy,
      select: {
        id: true,
        name: true,
        slug: true,
        image: true,
        location: true,
        rating: true,

        specialty: {
          select: {
            label: true,
            slug: true,
            title: true,
          },
        },
        isActive: true,
        isOnline: true,
        schedules: {
          select: {
            day: true,
            endTime: true,
            startTime: true,
          },
        },
      },
    }),
    prisma.doctor.count({ where }),
  ]);

  return {
    data,
    meta: buildMeta(query.page, query.limit, total),
  };
}
export async function getDoctorsSpecialty() {
  const speciality = await prisma.specialty.findMany({
    where: {},

    select: {
      label: true,
      slug: true,
    },
  });

  return speciality.map((c) => ({
    label: c.label,
    value: c?.slug,
  }));
}

export async function getDoctorBySlug(slug: string[]): Promise<IDoctorCard> {
  const doctor = await prisma.doctor.findFirst({
    where: {
      slug: slug[1],
      specialty: {
        label: slug[0],
      },
    },
    select: {
      id: true,
      name: true,
      slug: true,
      image: true,
      location: true,
      rating: true,

      specialty: {
        select: {
          label: true,
          slug: true,
          title: true,
        },
      },
      bio: true,
      isOnline: true,
      schedules: {
        select: {
          day: true,
          startTime: true,
          endTime: true,
        },
      },
      experience: true,
      isActive: true,
      experiences: {
        select: {
          title: true,
          description: true,
          startYear: true,
          endYear: true,
          place: true,
        },
      },
      educations: {
        select: {
          degree: true,
          university: true,
        },
      },
    },
  });

  if (!doctor) throw new Error("DOCTOR_NOT_FOUND");

  return {
    ...doctor,
    image: doctor.image ?? undefined,
  };
}

export async function getRelatedDoctorBySlug(slug: string[]) {
  const doctor = await prisma.doctor.findMany({
    where: {
      specialty: {
        label: slug[0],
      },
      NOT: {
        slug: slug[1],
      },
    },

    select: {
      id: true,
      name: true,
      slug: true,
      image: true,
      location: true,
      rating: true,

      specialty: {
        select: {
          label: true,
          slug: true,
        },
      },
      isOnline: true,
      schedules: {
        select: {
          day: true,
          endTime: true,
          startTime: true,
        },
      },
    },
  });

  if (!doctor) {
    throw new Error("DOCTOR_NOT_FOUND");
  }

  return doctor;
}
