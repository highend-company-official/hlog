import { CommentType, supabase } from "@/shared";

export const fetchComments = (articleId: string) => {
  return supabase
    .from("comments")
    .select(
      `
        id,
        body,
        created_at,
        profiles (id, username, profile_url)
      `
    )
    .match({ article_id: articleId })
    .throwOnError()
    .returns<CommentType[]>();
};
