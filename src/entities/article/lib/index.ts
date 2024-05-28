import { useSuspenseQuery } from "@tanstack/react-query";
import * as shared from "@/shared";
import { fetchArticle, fetchArticles } from "../api";
import { SortType } from "@/entities/article/model";

export const useFetchArticle = (articleId: string) => {
  const queryKey = useFetchArticle.pk(articleId);
  const queryFn = async () => {
    const response = await fetchArticle(articleId);

    if (!response.data) return null;

    return {
      id: response.data.id,
      has_comments: response.data.has_comments,
      has_hit: response.data.has_hit,
      has_like: response.data.has_like,
      likes: response.data.likes,
      summary: response.data.summary,
      thumbnail: response.data.thumbnail,
      title: response.data.title,
      created_at: response.data.created_at,
      body: response.data.body,
      hits: response.data.hits,
      user_id: response.data.user_id,
      profile: {
        user_id: response.data.user_id,
        username: response.data.username,
        profile_url: response.data.profile_url,
      },
    };
  };

  return useSuspenseQuery({ queryKey, queryFn });
};

useFetchArticle.pk = (articleId: string) => [
  shared.QUERY_CONSTS.ARTICLE,
  articleId,
];

export const useFetchArticles = (sortType: SortType) => {
  const queryKey = useFetchArticles.pk(sortType);
  const queryFn = async () => {
    const response = await fetchArticles(sortType);

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

useFetchArticles.pk = (sortType: SortType) => [
  shared.QUERY_CONSTS.ARTICLE,
  sortType,
];
