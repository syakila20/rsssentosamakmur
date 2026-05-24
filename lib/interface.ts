export interface ArticleSearchParams {
  articlePage?: string;
  articleSearch?: string;
}

export interface IOption {
  label: string;
  value: string;
}

export interface IArticleFilter {
  categories: IOption[];
}
