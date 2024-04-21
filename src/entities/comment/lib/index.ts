import { useQuery } from "@tanstack/react-query";
import { fetchComments } from "../api";

export const useFetchComments = (articleId: number) => {
  const queryKey = ["comments", articleId];
  const queryFn = async () => {
    const resposne = await fetchComments(articleId);
    return resposne.data;
  };

  return useQuery({ queryKey, queryFn });
};
