/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma } from "@prisma/client";

export type ArticleWithAuthor = Prisma.ArticleGetPayload<{
  include: {
    author: {
      select: {
        name: true;
      };
    };
  };
}>;

export type ApiError = {
  success: false;
  message: string;
  code?: string;
  status?: number;
  details?: unknown;
};
export type ApiMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

// export type ApiResponse<T> = {
//   success: true;
//   data: T;
//   meta?: ApiMeta | null;
// };

export type ApiResponse<T> = {
  success: true;
  data: T;
  meta: ApiMeta;
};

export type ApiErrorResponse = {
  success: false;
  error: {
    message: string;
    code?: string;
  };
};
export interface IArticleCard {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category?: {
    name: string;
    slug: string;
  };
  createdAt: Date;
  thumbnail: string;
  author?: {
    name?: string;
    avatar?: string;
  };
  publishedAt?: Date;
}
export interface ArticleSearchParams {
  articlePage?: string;
  articleSearch?: string;
}

export interface IOption {
  label: string;
  value: string;
}

export interface IArticleFilter {
  categories: IOption[];
}

export interface ISchedule {
  day: any;
  endTime: any;
  startTime: any;
}
export interface IDoctorCard {
  id: number;
  name: string;
  slug: string;

  image?: string;
  bio: string | null;

  location: string;
  rating: number;

  experience: string;

  specialty: {
    label: string;
    slug: string;
  };

  isOnline: boolean;

  schedules: {
    day: number;
    startTime: number;
    endTime: number;
  }[];

  experiences: {
    title: string;
    description: string;
    startYear: number;
    endYear: number | null;
    place: string;
  }[];

  educations: {
    degree: string;
    university: string;
  }[];
}

export type FilterMapper<TWhere> = {
  [key: string]: (value: string) => Partial<TWhere>;
};
export type FilterableFields<TWhere> =
  | string[]
  | Record<string, (value: string) => Partial<TWhere>>;
export type BuildQueryOptions<TWhere = Record<string, unknown>> = {
  searchParams: URLSearchParams;
  searchableFields?: string[];
  filterableFields?: FilterableFields<TWhere>;
  sortableFields?: string[];
  defaultSort?: string;
};
export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type PaginatedResponse<T> = {
  data: T[];
  meta: PaginationMeta;
};

export interface SectionClientProps<T, TFilter = unknown> {
  initialData: T[];
  initialMeta: ApiMeta;
  categories?: TFilter[];
  showPagination?: boolean;
  showTitle?: boolean;
}

export type MetaInput = {
  title: string;
  description: string;
  path: string;
  locale?: string;
  image?: string;
  noIndex?: boolean;
  type?: "website" | "article" | "profile";
  keywords?: string[];
};
export type JobWhereInput = {
  id?: string;

  title?: {
    contains?: string;
    mode?: "insensitive";
  };

  slug?: string;

  department?: string;

  employmentType?: string;

  experienceLevel?: string;

  workplaceType?: string;

  locationCity?: string;
  locationCountry?: string;

  isUrgent?: boolean;

  createdAt?: {
    gte?: Date;
    lte?: Date;
  };

  salaryMin?: {
    gte?: number;
  };

  salaryMax?: {
    lte?: number;
  };

  AND?: JobWhereInput[];
  OR?: JobWhereInput[];
};

export const jobCardSelect = {
  id: true,
  title: true,
  slug: true,
  departement: true,
  employmentType: true,
  deadline: true,
  _count: true,
  salaryMax: true,
  salaryMin: true,
  isUrgent: true,
  postedAt: true,
  shortDescription: true,
  description: true,
  experienceLevel: true,
  skills: {
    select: {
      skill: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  },
  benefits: {
    select: {
      value: true,
    },
  },
  requirements: {
    select: {
      value: true,
    },
  },
} satisfies Prisma.JobSelect;

export type IJobCard = Prisma.JobGetPayload<{
  select: typeof jobCardSelect;
}>;

export const changeEnumEmployeType = {
  FULL_TIME: "Penuh Waktu",
  PART_TIME: "Paruh Waktu",
  CONTRACT: "Kontrak",
};

const departments = [
  "Dokter Spesialis",
  "Dokter Umum",
  "Keperawatan",
  "Radiologi",
  "Laboratorium",
  "Farmasi",
  "Rehabilitasi Medik",
  "Rekam Medis",
  "Gizi",
  "Administrasi",
  "Keuangan",
  "Human Resource",
  "Teknologi Informasi",
  "Marketing",
  "Manajemen Rumah Sakit",
];

export interface IDoctorCardSpec extends IDoctorCard {
  specialty: {
    label: string;
    slug: string;
  };
}

export type IPropDoctors = SectionClientProps<IDoctorCardSpec, IOption>;
