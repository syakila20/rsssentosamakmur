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

export function useArticleForm() {
  const [state, dispatch] = useReducer(articleReducer, initialArticleState);
  const router = useRouter();

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
  }

  async function submit(isEdit?: boolean, idArticle?: number) {
    dispatch({
      type: "SET_LOADING",
      payload: true,
    });

    dispatch({
      type: "SET_ERROR",
      payload: null,
    });

    try {
      const getIdCategory = parseSlugId(state?.categoryId);
      const getIdTags = parseSlugId(state?.tagIds);
      const payload = {
        title: state.title,
        excerpt: state.excerpt,
        thumbnail: state.thumbnail,
        contentJson: state.contentJson,
        content: state.content,
        categoryId: Number(state?.categoryId),
        tagIds: getIdTags?.map((e) => e.id),
      };
      console.log("??payload", { payload });
      const response = isEdit
        ? await createArticleAction(payload)
        : await updateArticleAction(Number(idArticle), payload);

      if (!response.success) {
        dispatch({
          type: "SET_ERROR",
          payload: response.message || "",
        });

        return;
      }

      router.push(`/cms/artikel/edit/${response?.data?.id}`);
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
  };
}
