"use client";

import Link from "next/link";
import { useCurrentRoute } from "@/lib/getPath";
import { formatSlug } from "@/lib/toSlug";

export const Breadcrumb = () => {
  const { modules, action, slug } = useCurrentRoute();

  if (!modules) return null;

  return (
    <div className="flex items-center gap-2 text-sm">
      <Link
        href={`/cms/${modules}`}
        className="text-slate-400 hover:text-slate-700 transition-colors"
      >
        {modules.toUpperCase()}
      </Link>

      {action && (
        <>
          <span className="text-slate-300">/</span>

          {!slug ? (
            <span className="font-medium text-blue-800">
              {action.toUpperCase()}
            </span>
          ) : (
            <span className="text-slate-400">{action.toUpperCase()}</span>
          )}
        </>
      )}

      {/* SLUG */}
      {slug && (
        <>
          <span className="text-slate-300">/</span>

          <span className="font-medium text-slate-800">{formatSlug(slug)}</span>
        </>
      )}
    </div>
  );
};
