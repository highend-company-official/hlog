import { createQueryKeys } from "@lukemorales/query-key-factory";
import { SortType } from "../model";

export type ArticleFilterType = {
  search?: string;
  categories?: string[];
  userId?: string;
  sortType?: SortType;
};

export const articleKeyFactor = createQueryKeys("article", {
  list: (filter: ArticleFilterType) => [filter],
  detail: (articleId: string) => [articleId],
  articleLiked: (userId: string, articleId: string) => [userId, articleId],
});
