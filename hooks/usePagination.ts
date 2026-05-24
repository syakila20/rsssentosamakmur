// "use client";

// import { usePathname, useRouter, useSearchParams } from "next/navigation";

// import { useTransition } from "react";

// interface PaginationOptions {
//   pageKey: string;
//   searchKey?: string;
//   categoryKey?: string;
// }

// export function usePagination({
//   pageKey,
//   searchKey,
//   categoryKey,
// }: PaginationOptions) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   const [isPending, startTransition] = useTransition();

//   // values from URL (IMPORTANT FIX)
//   const page = Number(searchParams.get(pageKey)) || 1;

//   const search = searchKey ? (searchParams.get(searchKey) ?? "") : "";

//   const category = categoryKey ? (searchParams.get(categoryKey) ?? "") : "";

//   const updateQuery = (
//     params: Record<string, string | number | undefined>,
//     method: "push" | "replace" = "replace",
//   ) => {
//     const newParams = new URLSearchParams(searchParams.toString());

//     Object.entries(params).forEach(([key, value]) => {
//       if (value === undefined || value === "") {
//         newParams.delete(key);
//       } else {
//         newParams.set(key, String(value));
//       }
//     });

//     const url = `${pathname}?${newParams.toString()}`;

//     startTransition(() => {
//       router[method](url, { scroll: false });
//     });
//   };

//   const handlePageChange = (newPage: number) => {
//     updateQuery(
//       {
//         [pageKey]: newPage,
//       },
//       "push",
//     );
//   };

//   const handleSearchChange = (value: string) => {
//     if (!searchKey) return;

//     updateQuery(
//       {
//         [searchKey]: value,
//         [pageKey]: 1,
//       },
//       "replace",
//     );
//   };

//   return {
//     page,
//     search,
//     category,
//     isPending,
//     handlePageChange,
//     handleSearchChange,
//   };
// }
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useTransition } from "react";

interface PaginationOptions {
  pageKey: string;
  searchKey?: string;
  categoryKey?: string;
}

export function usePagination({
  pageKey,
  searchKey,
  categoryKey,
}: PaginationOptions) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  const page = Number(searchParams.get(pageKey)) || 1;

  const updateQuery = (params: Record<string, string | number | undefined>) => {
    const newParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === "") {
        newParams.delete(key);
      } else {
        newParams.set(key, String(value));
      }
    });

    const url = `${pathname}?${newParams.toString()}`;

    startTransition(() => {
      router.push(url, { scroll: false });
    });
  };

  const handlePageChange = (newPage: number) => {
    updateQuery({
      [pageKey]: newPage,
    });
  };

  return {
    page,
    isPending,
    handlePageChange,
  };
}
