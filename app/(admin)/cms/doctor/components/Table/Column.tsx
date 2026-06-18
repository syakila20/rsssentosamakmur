import { Column } from "@/Component/Table/type";
import { formatDate } from "@/lib/helperDate";
import { IDoctorCard } from "@/types/type";
import Link from "next/link";

export const Columns: Column<IDoctorCard>[] = [
  {
    key: "number",
    title: "No",
    numbering: true,
    className: "w-16",
  },

  {
    key: "name",
    title: "Doktor",
  },

  {
    key: "specialty",
    title: "Spesialis",
    render(row) {
      return <span>{row?.specialty?.label}</span>;
    },
  },

  {
    key: "action",
    title: "",

    render: (row) => (
      <Link
        href={`/cms/article/edit/${row?.slug}`}
        className="
          rounded-lg
          border
          border-slate-200
          px-3
          py-1
          text-sm
          hover:bg-slate-50
        "
      >
        Detail
      </Link>
    ),
  },
];
