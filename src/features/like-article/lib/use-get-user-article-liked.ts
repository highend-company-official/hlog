import { useSuspenseQuery } from "@tanstack/react-query";

import { articleKeyFactor, getUserArticleLike } from "@/entities/article";

const useGetUserArticleLiked = (userId: string, articleId: string) => {
  const queryKey = articleKeyFactor.articleLiked(userId, articleId).queryKey;
  const queryFn = async () => {
    const response = await getUserArticleLike(userId, articleId);

    if (response?.length === 0) return false;

    return true;
  };

  return useSuspenseQuery({
    queryKey,
    queryFn,
  });
};

export default useGetUserArticleLiked;
