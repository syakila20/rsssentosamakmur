import SvgChevronLeft from "@/Icon/Chevron";
import clsx from "clsx";

interface Props {
  onNext: () => void;
  onPrev: () => void;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  page: number;
  totalPages: number;
  isPending?: boolean;
}

export default function Pagination({
  onNext,
  onPrev,
  hasNextPage,
  hasPreviousPage,
  page,
  totalPages,
  isPending,
}: Props) {
  return (
    <div className="flex justify-between items-center mt-4 px-2">
      <p className="text-sm text-gray-500">
        {page} / {totalPages}
      </p>

      <div className="flex gap-2">
        <button
          type="button"
          aria-label="Previous page"
          onClick={onPrev}
          disabled={!hasPreviousPage || isPending}
          className={clsx(
            "px-3 py-2 rounded transition",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            hasPreviousPage
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-500",
          )}
        >
          <SvgChevronLeft height="20" />
        </button>
        <button
          type="button"
          aria-label="Next page"
          onClick={onNext}
          disabled={!hasNextPage || isPending}
          className={clsx(
            "px-3 py-2 rounded transition",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            hasNextPage
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-500",
          )}
        >
          <SvgChevronLeft className="rotate-180" height="20" />
        </button>
      </div>
    </div>
  );
}
