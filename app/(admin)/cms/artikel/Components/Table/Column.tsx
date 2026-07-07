import MotionCheckboxPill from "@/Component/PillCheckbox/PillCheck";
import { Column } from "@/Component/Table/type";
import SvgArticle from "@/Icon/Article";
import SvgUsers from "@/Icon/User";
import { isEmptyValue } from "@/lib/commonFunction";
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
    title: "Judul & Author",
    render(row) {
      const title = row?.title;
      const user = row?.author?.name;
      return (
        <div className="flex flex-col">
          <span className="font-medium capitalize">{title}</span>
          <span className="flex gap-2 text-slate-500 text-xs">
            <SvgUsers className="w-3 rounded-full" />
            {user}
          </span>
        </div>
      );
    },
  },

  {
    key: "publishedAt",
    title: "Tgl Publish",
    render(row) {
      return (
        <span>
          {isEmptyValue(row?.publishedAt)
            ? "-"
            : formatDate(row?.publishedAt as Date, "long")}
        </span>
      );
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
    key: "category",
    title: "Tag",
    render(row) {
      return (
        <div className="flex flex-wrap gap-1">
          {row?.tags?.map((x, id) => (
            <span
              key={id}
              className="px-1.5 py-1 text-sm bg-slate-700 text-white rounded-md"
            >
              {x?.tag?.name}
            </span>
          ))}
        </div>
      );
    },
  },
  {
    key: "action",
    title: "",

    render: (row) => (
      <Link href={`/cms/artikel/edit/${row?.id}`} className="text-emerald-700">
        <SvgArticle />
      </Link>
    ),
  },
];
