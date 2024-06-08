import { PostgrestError } from "@supabase/supabase-js";
import { useSuspenseQuery } from "@tanstack/react-query";

import { getArticleById } from "../api";
import { articleKeyFactor } from "../query";

const useGetArticleById = (articleId: string) => {
  const queryKey = articleKeyFactor.detail(articleId).queryKey;
  const queryFn = async () => {
    try {
      const response = await getArticleById(articleId);
      return response;
    } catch (error: unknown) {
      if ((error as PostgrestError).code === "PGRST116") return null;
    }
  };

  return useSuspenseQuery({ queryKey, queryFn });
};

export default useGetArticleById;
