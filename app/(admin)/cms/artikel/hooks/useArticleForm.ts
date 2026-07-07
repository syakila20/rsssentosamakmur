import { useReducer } from "react";
import {
  ArticleFormState,
  articleReducer,
  CreateArticlePayload,
  initialArticleState,
} from "./article.reducer";

import {
  createArticleAction,
  publishArticleAction,
  updateArticleAction,
} from "@/modules/article/article.action";

import { parseSlugId } from "@/lib/helper";
import { useRouter } from "next/navigation";
import { useAutoSave } from "./useAutosaveArticle";
import { useToast } from "@/Component/Toast/useToast";

type Props = {
  idArticle?: number;
  initialState?: ArticleFormState;
};

export function useArticleForm({ idArticle, initialState }: Props) {
  const [state, dispatch] = useReducer(
    articleReducer,
    initialState ?? initialArticleState,
  );

  const router = useRouter();
  const toast = useToast();
  const autosave = useAutoSave({
    articleId: idArticle ?? 0,
  });

  function setInitialData(payload: CreateArticlePayload) {
    dispatch({
      type: "SET_INITIAL_DATA",
      payload,
    });
  }

  function updateField<K extends keyof CreateArticlePayload>(
    field: K,
    value: CreateArticlePayload[K],
  ) {
    dispatch({
      type: "UPDATE_FIELD",
      field,
      value,
    });
  }

  function updateTitle(title: string) {
    dispatch({
      type: "UPDATE_FIELD",
      field: "title",
      value: title,
    });

    if (!idArticle) return;

    autosave.schedule({
      title,
    });
  }

  function updateThumbnail(url: string) {
    dispatch({
      type: "UPDATE_FIELD",
      field: "title",
      value: url,
    });

    if (!idArticle) return;

    autosave.schedule({
      thumbnail: url,
    });
  }

  function updateExcerpt(excerpt: string) {
    dispatch({
      type: "UPDATE_FIELD",
      field: "excerpt",
      value: excerpt,
    });

    if (!idArticle) return;

    autosave.schedule({
      excerpt,
    });
  }

  function updateEditor(contentJson: string, content: string) {
    dispatch({
      type: "UPDATE_FIELDS",
      payload: {
        contentJson,
        content,
      },
    });

    if (!idArticle) return;

    autosave.schedule({
      contentJson,
      content,
    });
  }

  async function submit(isEdit?: boolean, idArticleSubmit?: number) {
    dispatch({
      type: "SET_LOADING",
      payload: true,
    });

    dispatch({
      type: "SET_ERROR",
      payload: null,
    });

    try {
      const getIdTags = parseSlugId(state.tagIds);
      const payload = {
        title: state.title,
        excerpt: state.excerpt,
        thumbnail: state.thumbnail,
        contentJson: state.contentJson,
        content: state.content,
        thumbnailPublicId: state?.thumbnailPublicId,
        categoryId: Number(state?.categoryId),
        tagIds: getIdTags?.map((e) => e.id),
      };

      const response = !isEdit
        ? await updateArticleAction(Number(idArticleSubmit), payload)
        : await createArticleAction(payload);

      if (!response.success) {
        toast.danger(response.message || "Gagal menyimpan artikel.");
        return;
      }
      toast.success(
        !isEdit ? "Artikel berhasil diperbarui." : "Artikel berhasil dibuat.",
      );
      router.push(`/cms/artikel/edit/${response.data?.id}`);
    } catch (error) {
      toast.danger(
        error instanceof Error ? error.message : "Failed create article",
      );
    } finally {
      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
    }
  }

  async function onPublishArticle(idArticleSubmit?: number) {
    dispatch({
      type: "SET_PUBLISHING",
      payload: true,
    });

    dispatch({
      type: "SET_ERROR",
      payload: null,
    });

    try {
      const response = await publishArticleAction(Number(idArticleSubmit));

      if (!response.success) {
        toast.danger(response.message || "Gagal publish artikel.");
        return;
      }
      toast.success(response?.message || "Artikel berhasil dipublish.");
    } catch (error) {
      toast.danger(
        error instanceof Error ? error.message : "Failed publish article",
      );
    } finally {
      dispatch({
        type: "SET_PUBLISHING",
        payload: false,
      });
    }
  }

  return {
    state,
    setInitialData,
    updateField,
    updateTitle,
    updateExcerpt,
    updateEditor,
    submit,
    autosaveStatus: autosave.status,
    lastSaved: autosave.lastSaved,
    saveDraft: autosave.saveNow,
    dirty: autosave.isDirty,
    updateThumbnail,
    onPublishArticle,
  };
}
