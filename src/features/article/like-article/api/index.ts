import { supabase } from "@/shared";

export const postArticleLike = async (articleId: string) => {
  const response = await supabase
    .from("likes")
    .insert({
      article_id: articleId,
    })
    .throwOnError()
    .select();

  return response.data;
};
