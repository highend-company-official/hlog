import { useSuspenseQuery } from "@tanstack/react-query";
import * as shared from "@/shared";
import { fetchArticle, fetchArticles } from "../api";
import { SortType } from "@/app/store/article";

export const useFetchArticle = (articleId: string) => {
  const queryKey = [shared.QUERY_CONSTS.ARTICLE, articleId];
  const queryFn = async () => {
    const resposne = await fetchArticle(articleId);
    return resposne.data;
  };

  return useSuspenseQuery({ queryKey, queryFn });
};

export const useFetchArticles = (sortType: SortType) => {
  const queryKey = [shared.QUERY_CONSTS.ARTICLE, sortType];
  const queryFn = async () => {
    const resposne = await fetchArticles(sortType);
    return resposne.data;
  };

  return useSuspenseQuery({ queryKey, queryFn });
};

export const usePatchArticleHit = () => {};
