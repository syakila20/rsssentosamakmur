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
import AdminPage from "@/app/(admin)/AdminPage";
import Toast from "@/Component/Toast/Toast";
import { createArticleFormState } from "../../hooks/article.reducer";

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
  const preview = file ? URL.createObjectURL(file) : "";
  console.log("??", { content });
  const {
    state,
    updateField,
    updateTitle,
    submit,
    autosaveStatus,
    updateEditor,
  } = useArticleForm({
    idArticle,
    initialState: createArticleFormState(content),
  });

  // useEffect(() => {
  //   if (!isCreate) {
  //     const reshapeTags = content?.tags?.map(
  //       (i) => `${i?.tag?.slug}_${i?.tag?.id}`,
  //     );
  //     setInitialData({
  //       categoryId: content?.category.id?.toString() || "",
  //       contentJson: content?.contentJson as string,
  //       title: content?.title || "",
  //       tagIds: reshapeTags || [],
  //       content: content?.content,
  //     });
  //   }
  // }, [isCreate, content?.id, content?.category.id]);

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
      <Toast
        show={["saved", "error"].includes(autosaveStatus)}
        position="bottom-left"
        message={
          autosaveStatus === "error"
            ? "Gagal Menyimpan"
            : "Berhasil Update Data"
        }
      />
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
              onChange={(e) => updateTitle(e.target.value)}
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
              updateEditor(JSON.stringify(json), html);
            }}
          />
        </div>
      </WrappingInputLabel>
    </AdminPage>
  );
}
