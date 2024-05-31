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
