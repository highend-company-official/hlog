import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchArticle, fetchArticles } from "../api";

export const useFetchArticle = (articleId: number) => {
  const queryKey = ["article", articleId];
  const queryFn = async () => {
    const resposne = await fetchArticle(articleId);
    return resposne.data;
  };

  return useSuspenseQuery({ queryKey, queryFn });
};

export const useFetchArticles = () => {
  const queryKey = ["article"];
  const queryFn = async () => {
    const resposne = await fetchArticles();
    return resposne.data;
  };

  return useSuspenseQuery({ queryKey, queryFn });
};
