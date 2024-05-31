import { useSuspenseQuery } from "@tanstack/react-query";

import { QUERY_CONSTS } from "@/shared";

import { getArticles } from "../api";
import { SortType } from "../model";

const useGetArticles = (sortType: SortType) => {
  const queryKey = useGetArticles.pk(sortType);
  const queryFn = async () => {
    const response = await getArticles(sortType);

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

useGetArticles.pk = (sortType: SortType) => [QUERY_CONSTS.ARTICLE, sortType];

export default useGetArticles;
