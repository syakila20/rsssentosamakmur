import { IDetailArticle } from "@/modules/article/type";

export type CreateArticlePayload = {
  title: string;
  excerpt?: string;
  thumbnail?: string;
  contentJson: string;
  content?: string;
  categoryId: string;
  thumbnailPublicId?: string;

  tagIds: string[];
};

export type ArticleFormState = CreateArticlePayload & {
  loading: boolean;
  publishing: boolean;
  error: string | null;
};

export type ArticleField = keyof CreateArticlePayload;

export const initialArticleState: ArticleFormState = {
  title: "",
  excerpt: "",
  thumbnail: "",
  thumbnailPublicId: "",
  contentJson: "",
  content: "",
  categoryId: "",
  tagIds: [],

  loading: false,
  error: null,
  publishing: false,
};

export type ArticleAction =
  | {
      type: "UPDATE_FIELD";
      field: ArticleField;
      value: CreateArticlePayload[ArticleField];
    }
  | {
      type: "UPDATE_FIELDS";
      payload: Partial<CreateArticlePayload>;
    }
  | {
      type: "SET_INITIAL_DATA";
      payload: CreateArticlePayload;
    }
  | {
      type: "SET_LOADING";
      payload: boolean;
    }
  | {
      type: "SET_ERROR";
      payload: string | null;
    }
  | {
      type: "SET_PUBLISHING";
      payload: boolean;
    };

export function articleReducer(
  state: ArticleFormState,
  action: ArticleAction,
): ArticleFormState {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };

    case "UPDATE_FIELDS":
      return {
        ...state,
        ...action.payload,
      };

    case "SET_INITIAL_DATA":
      return {
        ...state,
        ...action.payload,
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
    case "SET_PUBLISHING":
      return {
        ...state,
        publishing: action.payload,
      };

    default:
      return state;
  }
}

export function createArticleFormState(
  article?: IDetailArticle,
): ArticleFormState {
  if (!article) {
    return initialArticleState;
  }

  return {
    title: article.title ?? "",
    excerpt: article.excerpt ?? "",
    thumbnail: article.thumbnail ?? "",
    contentJson: (article.contentJson as string) ?? "",
    content: article.content ?? "",
    thumbnailPublicId: article?.thumbnailPublicId ?? "",
    categoryId: article.category?.id?.toString() ?? "",
    tagIds:
      article.tags?.map((item) => `${item.tag.slug}_${item.tag.id}`) ?? [],

    loading: false,
    error: null,
  };
}
