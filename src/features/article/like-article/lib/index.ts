import { useMutation } from "@tanstack/react-query";
import { postArticleLike } from "../api";

export const usePostArticleLike = (articleId: string) =>
  useMutation({
    mutationFn: () => postArticleLike(articleId),
  });
