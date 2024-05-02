import { useSuspenseQuery } from "@tanstack/react-query";
import * as shared from "@/shared";
import { fetchArticle, fetchArticles } from "../api";

export const useFetchArticle = (articleId: string) => {
  const queryKey = [shared.QUERY_CONSTS.ARTICLE, articleId];
  const queryFn = async () => {
    const resposne = await fetchArticle(articleId);
    return resposne.data;
  };

  return useSuspenseQuery({ queryKey, queryFn });
};

export const useFetchArticles = () => {
  const queryKey = [shared.QUERY_CONSTS.ARTICLE];
  const queryFn = async () => {
    const resposne = await fetchArticles();
    return resposne.data;
  };

  return useSuspenseQuery({ queryKey, queryFn });
};
