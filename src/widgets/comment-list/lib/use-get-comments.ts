import { useSuspenseQuery } from "@tanstack/react-query";

import { commentKeyFactor } from "@/entities/comment";

import { getComments } from "../api";

const useGetComments = (articleId: string) => {
  const queryKey = commentKeyFactor.list(articleId).queryKey;
  const queryFn = async () => {
    const response = await getComments(articleId);

    if (response.data === null) return [];

    return response.data;
  };

  return useSuspenseQuery({ queryKey, queryFn });
};

export default useGetComments;
