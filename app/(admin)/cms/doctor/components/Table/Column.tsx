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
    render(row) {
      return (
        <div className="flex flex-col">
          <div>
            <img className="w-10 h-10" src={row?.image} alt="gambar" />
          </div>
          <span className="font-medium text-slate-600">{`${row?.name} ${row?.specialty?.title}`}</span>
          <span className="font-light text-slate-400">
            {row?.specialty?.label}
          </span>
        </div>
      );
    },
  },
  {
    key: "isActive",
    title: "Kontak",
    render(row, index) {
      return <span>{row?.isActive ? "Aktif" : "Tidak Aktif"}</span>;
    },
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
        href={`/cms/doctor/${row?.slug}`}
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
