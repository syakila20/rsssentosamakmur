"use client";
import Table from "@/Component/Table/Table";
import React, { useEffect, useState } from "react";

import Pagination from "@/Component/pagination/Pagination";
import { ArticleClientProps } from "@/app/(public)/article/Client";
import { useQueryServer } from "@/hooks/useQuery";

import { Columns } from "./components/Table/Column";
import AdminPage from "../../AdminPage";
import ToolbarDoctor from "./components/Toolbar/Toolbar";

const ListDoctor: React.FC<ArticleClientProps> = ({
  initialData,
  initialMeta,
  categories,
}) => {
  const { category, isPending, setCategory, setPage, setSearch, setStatus } =
    useQueryServer({
      pageKey: "page",
      categoryKey: "category",
      statusKey: "isActivey",
      searchKey: "search",
    });

  return (
    <AdminPage title="Doktor">
      <ToolbarDoctor
        onSearch={(val) => setSearch(val)}
        optionCategory={categories}
        onApplyFilter={(cat, status) => {
          setCategory(cat);
          setStatus(status);
        }}
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

export default ListDoctor;
