"use client";
import Table from "@/Component/Table/Table";
import React, { useEffect, useState } from "react";
import { Columns } from "./Column";
import Toolbar from "@/Component/Toolbar/Toolbars";
import { Button } from "@/Component/Button/Button";
import SvgPlus from "@/Icon/Plus";
import Pagination from "@/Component/pagination/Pagination";
import { useQueryServer } from "@/hooks/useQuery";
import { useRouter } from "next/navigation";
import { IPropDoctors } from "@/types/type";

const ListDoctor: React.FC<IPropDoctors> = ({
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
        title="List Of Doctor"
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
              Dokter
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

export default ListDoctor;
