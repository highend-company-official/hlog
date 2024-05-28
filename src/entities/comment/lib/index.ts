import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchComments } from "../api";
import * as shared from "@/shared";

export const useFetchComments = (articleId: string) => {
  const queryKey = useFetchComments.pk(articleId);
  const queryFn = async () => {
    const resposne = await fetchComments(articleId);
    return resposne.data;
  };

  return useSuspenseQuery({ queryKey, queryFn });
};

useFetchComments.pk = (articleId: string) => [
  shared.QUERY_CONSTS.COMMENT,
  articleId,
];
