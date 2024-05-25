import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { fetchComments, postComment } from "../api";
import * as shared from "@/shared";

export const useFetchComments = (articleId: string) => {
  const queryKey = [shared.QUERY_CONSTS.COMMENT, articleId];
  const queryFn = async () => {
    const resposne = await fetchComments(articleId);
    return resposne.data;
  };

  return useSuspenseQuery({ queryKey, queryFn });
};

export const usePostComment = (articleId: string) =>
  useMutation({
    mutationFn: (body: string) => postComment(articleId, body),
  });
