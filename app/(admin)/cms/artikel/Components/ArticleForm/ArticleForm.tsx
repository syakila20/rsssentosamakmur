"use client";
import { useEffect, useState } from "react";
import WrappingInputLabel from "@/Component/WrappingInputLabel/WrappingInputLabel";
import { Input } from "@/Component/Input/Input";
import { Select } from "@/Component/Select/Select";
import { ImageUpload } from "@/Component/ImageUpload/ImageUpload";
import { IOption } from "@/types/type";
import { useArticleForm } from "../../hooks/useArticleForm";
import { Button } from "@/Component/Button/Button";
import { IDetailArticle } from "@/modules/article/type";
import ArticleEditor from "../Editor/ArticleEditor";
import FooterAdmin from "@/Component/Footer/FooterAdmin";
import AdminPage from "@/app/(admin)/AdminPage";

interface IArticleCreatePage {
  categories: IOption[];
  tagsArticle: IOption[];
  isCreate?: boolean;
  content?: IDetailArticle;
  idArticle?: number;
}

export default function ArticleCreatePage({
  categories,
  tagsArticle,
  isCreate,
  idArticle,
  content,
}: IArticleCreatePage) {
  const [file, setFile] = useState<File | null>(null);
  const preview = file ? URL.createObjectURL(file) : null;
  const { state, updateField, updateContent, submit, autosaveStatus } =
    useArticleForm({
      idArticle,
    });

  useEffect(() => {
    if (!isCreate) {
      const reshapeTags = content?.tags?.map(
        (i) => `${i?.tag?.slug}_${i?.tag?.id}`,
      );
      updateField("categoryId", content?.category.id?.toString() || "");
      updateField("title", content?.title || "");
      updateField("tagIds", reshapeTags || []);
      updateField("content", content?.content);
      updateField("contentJson", content?.contentJson as string);
    }
  }, [isCreate, content?.id, content?.category.id]);

  return (
    <AdminPage
      title={`Halaman ${isCreate ? "Tambah" : "Edit"} Artikel`}
      footerLeftActions={[<Button key="1">Cancel</Button>]}
      footerRightActions={[
        <Button key="2" variant="outline">
          Cancel
        </Button>,
        <Button
          key="2"
          loading={state?.loading}
          onClick={() => submit(isCreate, idArticle)}
        >
          {isCreate ? "Simpan" : "Perbarui"}
        </Button>,
      ]}
    >
      <div className="mb-2 text-right text-sm">
        {autosaveStatus === "saving" && (
          <span className="text-yellow-600">Menyimpan...</span>
        )}

        {autosaveStatus === "saved" && (
          <span className="text-green-600">Tersimpan ✓</span>
        )}

        {autosaveStatus === "error" && (
          <span className="text-red-600">Gagal menyimpan</span>
        )}
      </div>
      <div
        className="
            grid
            grid-cols-1
            gap-6
            lg:grid-cols-12
          "
      >
        <div
          className="
              space-y-5
              lg:col-span-5
            "
        >
          <WrappingInputLabel label="Judul">
            <Input
              placeholder="Input Judul"
              value={state.title}
              onChange={(e) => updateField("title", e.target.value)}
            />
          </WrappingInputLabel>

          <WrappingInputLabel label="Pilih Kategori">
            <Select
              value={state?.categoryId || ""}
              onChange={(value) => updateField("categoryId", value as string)}
              options={categories as []}
            />
          </WrappingInputLabel>

          <WrappingInputLabel label="Pilih Tag">
            <Select
              multiple
              value={state?.tagIds}
              onChange={(value) => updateField("tagIds", value as string[])}
              options={tagsArticle}
              maxVisibleTags={3}
            />
          </WrappingInputLabel>
        </div>

        <div className="lg:col-span-6">
          <WrappingInputLabel label="Thumbnail" className="w-full h-53">
            <ImageUpload preview={preview} onChange={setFile} />
          </WrappingInputLabel>
        </div>
      </div>

      <WrappingInputLabel label="Content">
        <div
          className="
                min-h-125
                rounded-xl
                bg-white
              "
        >
          <ArticleEditor
            value={
              state.contentJson ? JSON.parse(state.contentJson) : undefined
            }
            onChange={(json, html) => {
              updateContent(JSON.stringify(json), html);
            }}
          />
          {/* 
                Masukkan editor:
                
                <Tiptap />
                <CKEditor />
                <Lexical />

              */}
        </div>
      </WrappingInputLabel>
    </AdminPage>
  );
}
