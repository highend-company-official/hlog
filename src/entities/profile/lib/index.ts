import * as shared from "@/shared";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchUserArticles } from "../api";

export const useFetchUserArticles = (userId: string) => {
  const queryKey = [
    shared.QUERY_CONSTS.USER,
    shared.QUERY_CONSTS.ARTICLE,
    userId,
  ];
  const queryFn = async () => {
    const resposne = await fetchUserArticles(userId);
    return resposne.data;
  };

  return useSuspenseQuery({ queryKey, queryFn });
};
