import * as shared from "@/shared";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import {
  fetchUserArticles,
  patchProfileImage,
  patchProfileImageReset,
} from "../api";

export const useFetchUserArticles = (userId: string) => {
  const queryKey = [
    shared.QUERY_CONSTS.USER,
    shared.QUERY_CONSTS.ARTICLE,
    userId,
  ];
  const queryFn = async () => {
    const resposne = await fetchUserArticles(userId);
    return resposne.data;
  };

  return useSuspenseQuery({ queryKey, queryFn });
};

export const usePatchProfileImageReset = (userId: string) =>
  useMutation({
    mutationFn: () => patchProfileImageReset(userId),
  });

export const usePatchProfileImage = (userId: string) =>
  useMutation({
    mutationFn: (profile: File) => patchProfileImage(userId, profile),
  });
