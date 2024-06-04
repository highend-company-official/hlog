import { SortType } from "../model";

export const ArticleQueryKeys = {
  articles: (sortType: SortType) => ["ARTICLE", sortType],
  detail: (articleId: string) => ["ARTICLE", articleId],
  articleLiked: (userId: string, articleId: string) => [
    "ARTICLE",
    "LIKE",
    userId,
    articleId,
  ],
  userArticles: (userId: string) => ["USER", "ARTICLE", userId],
};
