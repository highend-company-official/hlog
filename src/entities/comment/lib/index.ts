import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchComments } from "../api";
import * as shared from "@/shared";

export const useFetchComments = (articleId: string) => {
  const queryKey = [shared.QUERY_CONSTS.COMMENT, articleId];
  const queryFn = async () => {
    const resposne = await fetchComments(articleId);
    return resposne.data;
  };

  return useSuspenseQuery({ queryKey, queryFn });
};
