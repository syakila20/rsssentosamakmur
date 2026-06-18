import LinkBack from "@/Component/LinkBack/LinkBack";
import React from "react";

const page = () => {
  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 via-white to-fuchsia-50 pt-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8 py-10">
        <div className="mb-8">
          <LinkBack
            linkTo="/article"
            title={
              <div className="inline-flex items-center rounded-full bg-emerald-100/50 px-4 py-1 text-sm font-medium text-teal-700">
                Title
              </div>
            }
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <article className="lg:col-span-8">
            <div className="rounded-3xl overflow-hidden"></div>

            <div className="flex items-center my-14">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

              <div className="mx-4 flex items-center justify-center">
                <span className="text-slate-300 text-xl font-light">❝</span>
              </div>

              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            </div>
          </article>
        </div>
      </div>
    </main>
  );
};

export default page;
