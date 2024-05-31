import { QUERY_CONSTS } from "@/shared";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { getUserArticleLike, postArticleLike } from "../api";

export const usePostArticleLike = (userId: string, articleId: string) =>
  useMutation({
    mutationFn: () => postArticleLike(userId, articleId),
  });

export const useGetUserArticleLiked = (userId: string, articleId: string) => {
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
