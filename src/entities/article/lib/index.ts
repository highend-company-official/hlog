import { useQuery } from "@tanstack/react-query";
import { fetchArticle } from "../api";

export const useFetchArticle = (articleId: number) => {
  const queryKey = ["article", articleId];
  const queryFn = async () => {
    const resposne = await fetchArticle(articleId);
    return resposne.data;
  };

  return useQuery({ queryKey, queryFn });
};
