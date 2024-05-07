import { Article, supabase } from "@/shared";

export const fetchUserArticles = (userId: string) => {
  return supabase
    .from("articles")
    .select(
      `
          id,
          title,
          body,
          summary,
          thumbnail,
          created_at, 
          profiles (username)
        `
    )
    .eq("user_id", userId)
    .returns<Article[]>();
};
