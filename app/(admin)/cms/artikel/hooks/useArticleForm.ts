// import { useReducer } from "react";
// import {
//   articleReducer,
//   CreateArticlePayload,
//   initialArticleState,
// } from "./article.reducer";

// import {
//   createArticleAction,
//   updateArticleAction,
// } from "@/modules/article/article.action";

// import { parseSlugId } from "@/lib/helper";
// import { useRouter } from "next/navigation";
// import { useAutoSave } from "./useAutosaveArticle";

// type Props = {
//   idArticle?: number;
// };

// export function useArticleForm({ idArticle }: Props) {
//   const [state, dispatch] = useReducer(articleReducer, initialArticleState);

//   const router = useRouter();

//   const autosave = useAutoSave({
//     articleId: idArticle ?? 0,
//   });

//   function updateField<K extends keyof CreateArticlePayload>(
//     field: K,
//     value: CreateArticlePayload[K],
//   ) {
//     dispatch({
//       type: "UPDATE_FIELD",
//       field,
//       value,
//     });
//   }

//   function updateContent(contentJson: string, content: string) {
//     dispatch({
//       type: "UPDATE_CONTENT",
//       payload: {
//         contentJson,
//         content,
//       },
//     });

//     /**
//      * Autosave hanya aktif ketika edit article.
//      * Saat create belum ada id.
//      */
//     if (idArticle) {
//       autosave.schedule({
//         contentJson,
//         content,
//       });
//     }
//   }

//   async function submit(isCreate?: boolean, idArticleSubmit?: number) {
//     dispatch({
//       type: "SET_LOADING",
//       payload: true,
//     });

//     dispatch({
//       type: "SET_ERROR",
//       payload: null,
//     });

//     try {
//       const getIdTags = parseSlugId(state.tagIds);

//       const payload = {
//         title: state.title,
//         excerpt: state.excerpt,
//         thumbnail: state.thumbnail,
//         contentJson: state.contentJson,
//         content: state.content,
//         categoryId: 1,
//         tagIds: getIdTags?.map((e) => e.id),
//       };
//       console.log("??payload", { payload });

//       const response = isCreate
//         ? await createArticleAction(payload)
//         : await updateArticleAction(Number(idArticleSubmit), payload);

//       if (!response.success) {
//         dispatch({
//           type: "SET_ERROR",
//           payload: response.message || "",
//         });

//         return;
//       }

//       router.push(`/cms/artikel/edit/${response.data?.id}`);
//     } catch (error) {
//       dispatch({
//         type: "SET_ERROR",
//         payload:
//           error instanceof Error ? error.message : "Failed create article",
//       });

//       return null;
//     } finally {
//       dispatch({
//         type: "SET_LOADING",
//         payload: false,
//       });
//     }
//   }

//   return {
//     state,

//     updateField,

//     updateContent,

//     submit,

//     autosaveStatus: autosave.status,

//     saveDraft: autosave.saveNow,
//   };
// }

import { useReducer } from "react";
import {
  ArticleFormState,
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
  initialState?: ArticleFormState;
};

export function useArticleForm({ idArticle, initialState }: Props) {
  const [state, dispatch] = useReducer(
    articleReducer,
    initialState ?? initialArticleState,
  );

  const router = useRouter();

  const autosave = useAutoSave({
    articleId: idArticle ?? 0,
  });

  /**
   * Digunakan ketika membuka halaman edit.
   * Tidak memicu autosave.
   */
  function setInitialData(payload: CreateArticlePayload) {
    dispatch({
      type: "SET_INITIAL_DATA",
      payload,
    });
  }

  /**
   * Metadata.
   * Tidak autosave.
   */
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

  /**
   * Title autosave.
   */
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

  /**
   * Excerpt autosave.
   */
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
    console.log("XXupdateEditor()", {
      contentLength: content.length,
      stack: new Error().stack,
    });

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
    } finally {
      dispatch({
        type: "SET_LOADING",
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
  };
}
