import { useSuspenseQuery } from "@tanstack/react-query";

import { articleKeyFactor } from "@/entities/article";

import { fetchUserArticles } from "../api";

export const useFetchUserArticles = (userId: string) => {
  const queryKey = articleKeyFactor.profileList(userId).queryKey;
  const queryFn = async () => {
    const response = await fetchUserArticles(userId);
    return response;
  };

  return useSuspenseQuery({ queryKey, queryFn });
};
