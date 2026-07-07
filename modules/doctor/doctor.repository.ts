import { prisma } from "@/lib/prisma";
import { toSlug } from "@/lib/toSlug";
import { CreateDoctorPayload, UpdateDoctorPayload } from "./type";

export async function createDoctorRepository(payload: CreateDoctorPayload) {
  return prisma.$transaction(async (tx) => {
    return tx.doctor.create({
      data: {
        name: payload.name,
        slug: toSlug(payload.name),

        location: payload.location,
        bio: payload.bio,

        experience: payload.experience,

        price: payload.price,

        email: payload.email,

        phoneNumber: payload.phoneNumber,

        image: payload.image,
        imagePublicId: payload.imagePublicId,

        specialtyId: payload.specialtyId,

        isOnline: payload.isOnline,
        isActive: payload.isActive,

        educations: {
          create: payload.educations,
        },

        experiences: {
          create: payload.experiences,
        },

        schedules: {
          create: payload.schedules,
        },
      },
    });
  });
}

export async function updateDoctorRepository(
  id: number,
  payload: UpdateDoctorPayload,
) {
  return prisma.$transaction(async (tx) => {
    return tx.doctor.update({
      where: {
        id,
      },

      data: {
        name: payload.name,
        slug: toSlug(payload.name || ""),

        location: payload.location,
        bio: payload.bio,

        experience: payload.experience,

        price: payload.price,

        email: payload.email,

        phoneNumber: payload.phoneNumber,

        image: payload.image,
        imagePublicId: payload.imagePublicId,

        specialtyId: payload.specialtyId,

        isOnline: payload.isOnline,
        isActive: payload.isActive,

        educations: {
          deleteMany: {},
          create: payload.educations,
        },

        experiences: {
          deleteMany: {},
          create: payload.experiences,
        },

        schedules: {
          deleteMany: {},
          create: payload.schedules,
        },
      },
    });
  });
}

export async function findDoctorByIdRepository(id: number) {
  return prisma.doctor.findUnique({
    where: {
      id,
    },

    select: {
      id: true,

      name: true,
      slug: true,

      location: true,
      bio: true,

      experience: true,

      price: true,

      email: true,
      phoneNumber: true,

      image: true,
      imagePublicId: true,

      isOnline: true,
      isActive: true,

      specialty: {
        select: {
          id: true,
          label: true,
        },
      },

      educations: {
        orderBy: {
          graduationYear: "desc",
        },
      },

      experiences: {
        orderBy: {
          startYear: "desc",
        },
      },

      schedules: {
        orderBy: [
          {
            day: "asc",
          },
          {
            startTime: "asc",
          },
        ],
      },

      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function findDoctorBySlugRepository(slug: string) {
  return prisma.doctor.findFirst({
    where: {
      slug,
    },
  });
}

export async function deleteDoctorRepository(id: number) {
  return prisma.doctor.update({
    where: {
      id,
    },

    data: {
      deletedAt: new Date(),
    },
  });
}

export async function restoreDoctorRepository(id: number) {
  return prisma.doctor.update({
    where: {
      id,
    },

    data: {
      deletedAt: null,
    },
  });
}
