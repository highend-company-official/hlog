import { PostgrestError } from "@supabase/supabase-js";
import { useSuspenseQuery } from "@tanstack/react-query";

import { getArticleById } from "../api";
import { articleKeyFactor } from "../query";

const useGetArticleById = (articleId: string) => {
  const queryKey = articleKeyFactor.detail(articleId).queryKey;
  const queryFn = async () => {
    try {
      const response = await getArticleById(articleId);

      if (!response.data) return null;

      return {
        id: response.data.id,
        has_comments: response.data.has_comments,
        has_hit: response.data.has_hit,
        has_like: response.data.has_like,
        summary: response.data.summary,
        thumbnail: response.data.thumbnail,
        title: response.data.title,
        created_at: response.data.created_at,
        body: response.data.body,
        hits: response.data.hits,
        user_id: response.data.user_id,
        verified: response.data.verified,
        profile: {
          user_id: response.data.profiles.id,
          username: response.data.profiles.username,
          profile_url: response.data.profiles.profile_url,
        },
        likes: response.data.likes[0].count,
      };
    } catch (error: unknown) {
      if ((error as PostgrestError).code === "PGRST116") return null;
    }
  };

  return useSuspenseQuery({ queryKey, queryFn });
};

export default useGetArticleById;
