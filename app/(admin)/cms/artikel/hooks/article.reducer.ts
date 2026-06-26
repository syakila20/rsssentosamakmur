export type CreateArticlePayload = {
  title: string;
  excerpt?: string;
  thumbnail?: string;
  contentJson: string;
  content?: string;
  categoryId: string;
  tagIds: string[];
};

export type ArticleFormState = CreateArticlePayload & {
  loading: boolean;
  error: string | null;
};

export type ArticleField = keyof CreateArticlePayload;

export const initialArticleState: ArticleFormState = {
  title: "",
  excerpt: "",
  thumbnail: "",

  contentJson: "",
  content: "",

  categoryId: "",
  tagIds: [],

  loading: false,
  error: null,
};

export type ArticleAction =
  | {
      type: "UPDATE_FIELD";
      field: keyof CreateArticlePayload;
      value: CreateArticlePayload[keyof CreateArticlePayload];
    }
  | {
      type: "UPDATE_CONTENT";
      payload: {
        contentJson: string;
        content: string;
      };
    }
  | {
      type: "SET_LOADING";
      payload: boolean;
    }
  | {
      type: "SET_ERROR";
      payload: string | null;
    };

export function articleReducer(
  state: ArticleFormState,
  action: ArticleAction,
): ArticleFormState {
  switch (action?.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };

    case "UPDATE_CONTENT":
      return {
        ...state,
        contentJson: action.payload.contentJson,

        content: action.payload.content,
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}
