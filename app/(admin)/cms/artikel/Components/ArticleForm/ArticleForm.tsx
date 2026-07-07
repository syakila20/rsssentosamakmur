"use client";

import WrappingInputLabel from "@/Component/WrappingInputLabel/WrappingInputLabel";
import { Input } from "@/Component/Input/Input";
import { Select } from "@/Component/Select/Select";
import { ImageUpload } from "@/Component/ImageUpload/ImageUpload";
import { Button } from "@/Component/Button/Button";

import AdminPage from "@/app/(admin)/AdminPage";

import ArticleEditor from "../Editor/ArticleEditor";

import { useArticleForm } from "../../hooks/useArticleForm";
import { useThumbnailUpload } from "@/hooks/useUploadThumbnail";

import { createArticleFormState } from "../../hooks/article.reducer";

import { IDetailArticle } from "@/modules/article/type";
import { IOption } from "@/types/type";
import SaveIndicator from "@/Component/Editor/SaveIndicator";
import { can } from "@/lib/auth/rbac";
import { requirePermission } from "@/lib/auth/require-permission";

interface IArticleCreatePage {
  categories: IOption[];
  tagsArticle: IOption[];
  isCreate?: boolean;
  content?: IDetailArticle;
  idArticle?: number;
  hasApprovalPermission?: boolean;
}

export default function ArticleCreatePage({
  categories,
  tagsArticle,
  isCreate,
  idArticle,
  content,
  hasApprovalPermission,
}: IArticleCreatePage) {
  const {
    state,
    updateField,
    updateTitle,
    updateEditor,
    submit,
    autosaveStatus,
    dirty,
    lastSaved,
    onPublishArticle,
  } = useArticleForm({
    idArticle,
    initialState: createArticleFormState(content),
  });

  const thumbnail = useThumbnailUpload({
    value: state.thumbnail,
    onUploaded: (url, publicId) => {
      updateField("thumbnail", url);
      updateField("thumbnailPublicId", publicId);
    },
  });

  return (
    <AdminPage
      title={`Halaman ${isCreate ? "Tambah" : "Edit"} Artikel`}
      footerLeftActions={[
        <Button shape="full" key="cancel" variant="outline">
          Cancel
        </Button>,
      ]}
      footerRightActions={[
        <div key="submit">
          {hasApprovalPermission && (
            <Button
              shape="full"
              variant="secondary"
              loading={state.publishing}
              onClick={() => onPublishArticle(idArticle)}
            >
              Publish
            </Button>
          )}
        </div>,
        <Button
          key="submit"
          shape="full"
          loading={state.loading}
          onClick={() => submit(isCreate, idArticle)}
        >
          {isCreate ? "Simpan" : "Perbarui"}
        </Button>,
      ]}
      component={
        <SaveIndicator
          status={autosaveStatus}
          dirty={dirty}
          lastSaved={lastSaved}
        />
      }
    >
      <div className="mb-6">
        <WrappingInputLabel label="Judul">
          <Input
            placeholder="Masukkan judul artikel..."
            value={state.title}
            onChange={(e) => updateTitle(e.target.value)}
          />
        </WrappingInputLabel>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="rounded-xl bg-white shadow-sm">
            <ArticleEditor
              value={
                state.contentJson ? JSON.parse(state.contentJson) : undefined
              }
              onChange={(json, html) => {
                updateEditor(JSON.stringify(json), html);
              }}
            />
          </div>
        </div>

        <aside className="space-y-6 lg:col-span-4 lg:sticky lg:top-24 h-fit">
          <div className="rounded-xl shadow-sm h-50">
            <ImageUpload
              preview={thumbnail.preview}
              onChange={thumbnail.onChange}
              onDelete={() =>
                thumbnail.deleteImage(
                  thumbnail.publicId || state?.thumbnailPublicId || "",
                )
              }
            />
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <WrappingInputLabel label="Kategori">
              <Select
                value={state.categoryId}
                options={categories}
                onChange={(value) => updateField("categoryId", value as string)}
              />
            </WrappingInputLabel>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <WrappingInputLabel label="Tag">
              <Select
                multiple
                value={state.tagIds}
                options={tagsArticle}
                maxVisibleTags={3}
                onChange={(value) => updateField("tagIds", value as string[])}
              />
            </WrappingInputLabel>
          </div>
        </aside>
      </div>
    </AdminPage>
  );
}
