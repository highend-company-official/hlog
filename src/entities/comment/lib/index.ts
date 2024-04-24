import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchComments } from "../api";

export const useFetchComments = (articleId: string) => {
  const queryKey = ["comments", articleId];
  const queryFn = async () => {
    const resposne = await fetchComments(articleId);
    return resposne.data;
  };

  return useSuspenseQuery({ queryKey, queryFn });
};
