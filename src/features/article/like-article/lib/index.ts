import { useMutation } from "@tanstack/react-query";
import { postArticleLike } from "../api";

export const usePostArticleLike = (userId: string, articleId: string) =>
  useMutation({
    mutationFn: () => postArticleLike(userId, articleId),
  });
