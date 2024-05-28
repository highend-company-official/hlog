import { useMutation } from "@tanstack/react-query";
import { postComment } from "../api";

export const usePostComment = (articleId: string) =>
  useMutation({
    mutationFn: (body: string) => postComment(articleId, body),
  });
