import { QUERY_CONSTS } from "@/shared";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getUserArticleLike } from "../api/post-article-like";

const useGetUserArticleLiked = (userId: string, articleId: string) => {
  const queryKey = useGetUserArticleLiked.pk(userId, articleId);
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

useGetUserArticleLiked.pk = (userId: string, articleId: string) => [
  QUERY_CONSTS.ARTICLE,
  QUERY_CONSTS.LIKE,
  userId,
  articleId,
];

export default useGetUserArticleLiked;
