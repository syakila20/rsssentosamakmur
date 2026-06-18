import clsx from "clsx";
import { Column } from "./type";

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];

  loading?: boolean;
  emptyText?: string;
  startIndex?: number;
  pagination?: React.ReactNode;
  actions?: React.ReactNode;
}

export default function Table<T>({
  columns,
  data,

  loading = false,
  emptyText = "Data tidak ditemukan",

  pagination,
  startIndex = 0,
  actions,
}: TableProps<T>) {
  return (
    <div className="space-y-4">
      {actions && (
        <div className="flex items-center justify-between">{actions}</div>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-200/50">
                {columns.map((column) => (
                  <th
                    key={String(column.key)}
                    className={clsx(
                      `
                      px-6
                      py-4
                      text-left
                      text-sm
                      font-semibold
                      tracking-wider
                      text-slate-700
                    `,
                      column.className,
                    )}
                  >
                    {column.title}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {loading &&
                Array.from({ length: 5 }).map((_, rowIndex) => (
                  <tr key={rowIndex} className="border-b border-slate-100">
                    {columns.map((_, colIndex) => (
                      <td key={colIndex} className="px-6 py-4">
                        <div
                          className="
                            h-4
                            w-full
                            animate-pulse
                            rounded
                            bg-slate-200
                          "
                        />
                      </td>
                    ))}
                  </tr>
                ))}

              {!loading && data.length === 0 && (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="
                      py-14
                      text-center
                      text-sm
                      text-slate-500
                    "
                  >
                    {emptyText}
                  </td>
                </tr>
              )}

              {!loading &&
                data.map((row, index) => (
                  <tr
                    key={index}
                    className="
                      border-b
                      border-slate-100
                      hover:bg-slate-50
                      transition-colors
                    "
                  >
                    {columns.map((column) => (
                      <td
                        key={String(column.key)}
                        className="
                          px-6
                          py-4
                          text-sm
                          text-slate-700
                        "
                      >
                        {column.numbering
                          ? startIndex + index + 1
                          : column.render
                            ? column.render(row, index)
                            : String(row[column.key as keyof T] ?? "-")}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
