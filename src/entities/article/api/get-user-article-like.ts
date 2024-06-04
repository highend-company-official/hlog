import { supabase } from "@/shared";

type GetUserArticleLikeResponse = {
  id: string;
  created_at: string;
  user_id: string;
  article_id: string;
};

export const getUserArticleLike = async (userId: string, articleId: string) => {
  const response = await supabase
    .from("likes")
    .select("*")
    .eq("article_id", articleId)
    .eq("user_id", userId)
    .returns<GetUserArticleLikeResponse[]>()
    .throwOnError();

  return response.data;
};

export default getUserArticleLike;
