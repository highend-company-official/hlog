import { useMutation } from "@tanstack/react-query";
import { deleteComment, postComment, updateComment } from "../api";

export const usePostComment = (articleId: string) =>
  useMutation({
    mutationFn: (body: string) => postComment(articleId, body),
  });
export const useDeleteComment = () =>
  useMutation({
    mutationFn: deleteComment,
  });

export const useUpdateComment = (commentId: string) =>
  useMutation({
    mutationFn: (body: string) => updateComment(commentId, body),
  });
