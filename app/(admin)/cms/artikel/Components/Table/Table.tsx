"use client";
import Table from "@/Component/Table/Table";
import React, { useEffect, useState } from "react";
import { Columns } from "./Column";
import Toolbar from "@/Component/Toolbar/Toolbars";
import { Button } from "@/Component/Button/Button";
import SvgPlus from "@/Icon/Plus";
import Pagination from "@/Component/pagination/Pagination";
import { ArticleClientProps } from "@/app/(public)/article/Client";
import { useQueryServer } from "@/hooks/useQuery";
import { useRouter } from "next/navigation";
import { Select } from "@/Component/Select/Select";
import AdminPage from "@/app/(admin)/AdminPage";

const ListArticle: React.FC<ArticleClientProps> = ({
  initialData,
  initialMeta,
  categories,
}) => {
  const [publish, setPublish] = useState<string>("1");
  const { category, isPending, setCategory, setPage, setSearch } =
    useQueryServer({
      pageKey: "page",
      categoryKey: "category",
      searchKey: "search",
    });
  const router = useRouter();

  return (
    <AdminPage title="Artikel">
      <Toolbar
        title="List Artikel"
        onSearch={(e) => setSearch(e)}
        className="pb-2"
        showSearch
        action={
          <>
            <Button
              variant="secondary"
              shape="full"
              icon={<SvgPlus className="shrink-0" height="20" />}
              onClick={() => router.push("/cms/artikel/tambah")}
            >
              Artikel
            </Button>
          </>
        }
      />

      <Table
        columns={Columns}
        data={initialData as []}
        startIndex={(1 - 1) * 10}
      />
      <Pagination
        page={initialMeta.page}
        totalPages={initialMeta.totalPages}
        hasNextPage={initialMeta.hasNextPage}
        hasPreviousPage={initialMeta.hasPreviousPage}
        isPending={isPending}
        onNext={() => setPage(initialMeta.page + 1)}
        onPrev={() => setPage(initialMeta.page - 1)}
      />
    </AdminPage>
  );
};

export default ListArticle;
