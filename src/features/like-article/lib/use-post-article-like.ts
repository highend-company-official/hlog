import { useMutation } from "@tanstack/react-query";

import { postArticleLike } from "@/entities/article";

const usePostArticleLike = (userId: string, articleId: string) =>
  useMutation({
    mutationFn: () => postArticleLike(userId, articleId),
  });

export default usePostArticleLike;
