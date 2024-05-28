import { supabase } from "@/shared";

export const postArticleLike = async (userId: string, articleId: string) => {
  const response = await supabase
    .from("likes")
    .insert({
      user_id: userId,
      article_id: articleId,
    })
    .throwOnError()
    .select();

  return response.data;
};
