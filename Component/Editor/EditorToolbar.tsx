"use client";

import CoverUploader from "./CoverUpload";
import SeoPanel from "./SeoPanel";
import TagSelector from "./TagSelector";



export default function EditorPage() {
  return (
    <div className="mx-auto max-w-4xl py-12">
      <CoverUploader />

      <input
        placeholder="Article Title"
        className="
          mt-8
          w-full
          border-none
          outline-none
          text-5xl
          font-bold
        "
      />

      <SeoPanel />

      <TagSelector />

      <div className="mt-10">
        <TiptapEditor />
      </div>
    </div>
  );
}