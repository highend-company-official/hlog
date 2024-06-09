import { supabase } from "@/shared";

export const getUserArticleLike = async (userId: string, articleId: string) => {
  const response = await supabase
    .from("likes")
    .select("*")
    .eq("article_id", articleId)
    .eq("user_id", userId)
    .throwOnError();

  const { data, error } = response;
  if (error) throw error;

  return data;
};

export default getUserArticleLike;
