import { CommentType, supabase } from "@/shared";

export const fetchComments = (articleId: string) => {
  return supabase
    .from("comments")
    .select(
      `
        id,
        body,
        created_at,
        profiles (username, profile_url)
      `
    )
    .match({ article_id: articleId })
    .throwOnError()
    .returns<CommentType[]>();
};

export const postComment = async (
  articleId: string,
  body: string
): Promise<CommentType> => {
  const response = await supabase
    .from("comments")
    .insert({
      body,
      article_id: articleId,
    })
    .throwOnError()
    .select()
    .throwOnError()
    .single();

  return response.data;
};
