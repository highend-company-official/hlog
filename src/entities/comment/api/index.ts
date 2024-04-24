import { Comment, supabase } from "@/shared";

export const fetchComments = (articleId: string) => {
  return supabase
    .from("comments")
    .select(
      `
        id,
        body,
        created_at,
        profiles (username, profileUrl)
      `
    )
    .match({ article_id: articleId })
    .throwOnError()
    .returns<Comment[]>();
};
