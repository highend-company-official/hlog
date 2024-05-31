import { useSuspenseQuery } from "@tanstack/react-query";

import * as shared from "@/shared";

import { getComments } from "../api";

export const useGetComments = (articleId: string) => {
  const queryKey = useGetComments.pk(articleId);
  const queryFn = async () => {
    const resposne = await getComments(articleId);
    return resposne.data;
  };

  return useSuspenseQuery({ queryKey, queryFn });
};

useGetComments.pk = (articleId: string) => [
  shared.QUERY_CONSTS.COMMENT,
  articleId,
];
