import { useReducer } from "react";
import {
  articleReducer,
  CreateArticlePayload,
  initialArticleState,
} from "./article.reducer";

import {
  createArticleAction,
  updateArticleAction,
} from "@/modules/article/article.action";

import { parseSlugId } from "@/lib/helper";
import { useRouter } from "next/navigation";
import { useAutoSave } from "./useAutosaveArticle";

type Props = {
  idArticle?: number;
};

export function useArticleForm({ idArticle }: Props) {
  const [state, dispatch] = useReducer(articleReducer, initialArticleState);

  const router = useRouter();

  const autosave = useAutoSave({
    articleId: idArticle ?? 0,
  });

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

  function updateContent(contentJson: string, content: string) {
    dispatch({
      type: "UPDATE_CONTENT",
      payload: {
        contentJson,
        content,
      },
    });

    /**
     * Autosave hanya aktif ketika edit article.
     * Saat create belum ada id.
     */
    if (idArticle) {
      autosave.scheduleSave({
        contentJson,
        content,
      });
    }
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

        categoryId: Number(state.categoryId),

        tagIds: getIdTags?.map((e) => e.id),
      };

      const response = isEdit
        ? await updateArticleAction(Number(idArticleSubmit), payload)
        : await createArticleAction(payload);

      if (!response.success) {
        dispatch({
          type: "SET_ERROR",
          payload: response.message || "",
        });

        return;
      }

      router.push(`/cms/artikel/edit/${response.data?.id}`);
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload:
          error instanceof Error ? error.message : "Failed create article",
      });

      return null;
    } finally {
      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
    }
  }

  return {
    state,

    updateField,

    updateContent,

    submit,

    autosaveStatus: autosave.status,

    saveDraft: autosave.saveNow,
  };
}
