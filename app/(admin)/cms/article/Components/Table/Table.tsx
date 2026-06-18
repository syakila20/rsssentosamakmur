"use client";
import Table from "@/Component/Table/Table";
import React, { useEffect, useState } from "react";
import { Columns } from "./Column";
import Toolbar from "@/Component/Toolbar/Toolbars";
import { Button } from "@/Component/Button/Button";
import SvgArrow from "@/Icon/Arrow";
import SvgArticle from "@/Icon/Article";
import SvgPlus from "@/Icon/Plus";
import { useDebounce } from "@/hooks/useDebounce";
import Pagination from "@/Component/pagination/Pagination";
import { ArticleClientProps } from "@/app/(public)/article/Client";
import { useQueryServer } from "@/hooks/useQuery";
import { useRouter } from "next/navigation";

const ListArticle: React.FC<ArticleClientProps> = ({
  initialData,
  initialMeta,
  categories,
}) => {
  const { category, isPending, setCategory, setPage, setSearch } =
    useQueryServer({
      pageKey: "page",
      categoryKey: "category",
      searchKey: "search",
    });
  const router = useRouter();

  return (
    <>
      <Toolbar
        title="List Of Article"
        onSearch={(e) => setSearch(e)}
        className="pb-2.5"
        showSearch
        action={
          <>
            <Button
              variant="secondary"
              shape="full"
              icon={<SvgPlus className="shrink-0" height="20" />}
              onClick={() => router.push("/cms/article/Add")}
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
    </>
  );
};

export default ListArticle;
