// "use client";

// import Pagination from "./Pagination";
// import { usePagination } from "@/hooks/usePagination";

// interface Props {
//   pageKey: string;
//   hasNextPage: boolean;
//   hasPreviousPage: boolean;
//   page: number;
//   totalPages: number;
// }

// export default function PaginationClient({
//   pageKey,
//   page,
//   totalPages,
//   hasNextPage,
//   hasPreviousPage,
// }: Props) {
//   const { handlePageChange, isPending } = usePagination({ pageKey });

//   return (
//     <Pagination
//       page={page}
//       totalPages={totalPages}
//       hasNextPage={hasNextPage}
//       hasPreviousPage={hasPreviousPage}
//       isPending={isPending}
//       onNext={() => handlePageChange(page + 1)}
//       onPrev={() => handlePageChange(page - 1)}
//     />
//   );
// }
"use client";

import Pagination from "./Pagination";

interface Props {
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onNext: () => void;
  onPrev: () => void;
  isPending?: boolean;
}

export default function PaginationClient({
  page,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  onNext,
  onPrev,
  isPending,
}: Props) {
  return (
    <Pagination
      page={page}
      totalPages={totalPages}
      hasNextPage={hasNextPage}
      hasPreviousPage={hasPreviousPage}
      onNext={onNext}
      onPrev={onPrev}
      isPending={isPending}
    />
  );
}
