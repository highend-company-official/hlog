import * as shared from "@/shared";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import {
  fetchUserArticles,
  patchProfileImage,
  patchProfileImageReset,
  patchProfileInfo,
  type InfoType,
} from "../api";

export const useFetchUserArticles = (userId: string) => {
  const queryKey = [
    shared.QUERY_CONSTS.USER,
    shared.QUERY_CONSTS.ARTICLE,
    userId,
  ];
  const queryFn = async () => {
    const response = await fetchUserArticles(userId);

    if (response.data === null) return [];

    return response.data.map((data) => ({
      id: data.id,
      has_comments: data.has_comments,
      has_hit: data.has_hit,
      has_like: data.has_like,
      likes: data.likes,
      summary: data.summary,
      thumbnail: data.thumbnail,
      title: data.title,
      created_at: data.created_at,
      hits: data.hits,
      user_id: data.user_id,
      profile: {
        user_id: data.user_id,
        username: data.username,
        profile_url: data.profile_url,
      },
    }));
  };

  return useSuspenseQuery({ queryKey, queryFn });
};

export const usePatchProfileImageReset = (userId: string, profileUrl: string) =>
  useMutation({
    mutationFn: () => patchProfileImageReset(userId, profileUrl),
  });

export const usePatchProfileImage = (userId: string) =>
  useMutation({
    mutationFn: (profile: File) => patchProfileImage(userId, profile),
  });

export const usePatchProfileInfo = (userId: string) =>
  useMutation({
    mutationFn: (info: InfoType) => patchProfileInfo(userId, info),
  });
