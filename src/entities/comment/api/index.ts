import { Comment, supabase } from "@/shared";

export const fetchComments = (articleId: number) => {
  return supabase
    .from("comments")
    .select(
      `
        id,
        text,
        created_at,
        updated_at,
        users (username, profileUrl)
      `
    )
    .match({ article_id: articleId })
    .throwOnError()
    .returns<Comment[]>();
};
