import { Column } from "@/Component/Table/type";
import { formatDate } from "@/lib/helperDate";
import { IArticleCard } from "@/types/type";
import clsx from "clsx";
import Link from "next/link";

export const Columns: Column<IArticleCard>[] = [
  {
    key: "number",
    title: "No",
    numbering: true,
    className: "w-16",
  },

  {
    key: "title",
    title: "Judul",
  },

  {
    key: "publishedAt",
    title: "Tgl Publish",
    render(row) {
      return <span>{formatDate(row?.publishedAt as Date, "long")}</span>;
    },
  },

  {
    key: "category",
    title: "Kategori",
    render(row) {
      return <span>{row?.category?.name}</span>;
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
