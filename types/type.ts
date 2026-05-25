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
  category: string;
  createdAt: Date;
  thumbnail: string;
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
  id?: string;
  name: string;
  spesiality: string;
  location: string;
  image: string;
  experience: string;
  rating: number;
  reviews: number;
  isOnline?: boolean;
  slug: string;
  spesialitySlug?: string;
  schedules: ISchedule[];
}

export type BuildQueryOptions<TWhere = Record<string, unknown>> = {
  searchParams: URLSearchParams;
  searchableFields?: string[];
  filterableFields?: string[];
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
}

export type MetaInput = {
  title: string;
  description: string;

  path: string;

  locale?: string;

  image?: string;

  noIndex?: boolean;

  type?: "website" | "article" | "profile";
};
