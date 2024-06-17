import { createQueryKeys } from "@lukemorales/query-key-factory";
import { SortType } from "../model";

export type ArticleFilterType = {
  categories?: string[];
  sortType?: SortType;
  page: number;
};

export const articleKeyFactor = createQueryKeys("article", {
  list: (filter: ArticleFilterType) => [filter],
  detail: (articleId: string) => [articleId],
  articleLiked: (userId: string, articleId: string) => [userId, articleId],
  searchList: (search: string) => [search],
  profileList: (userId: string) => [userId],
});
