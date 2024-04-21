import { Article, supabase } from "@/shared";

export const fetchArticle = (articleId: number) => {
  return supabase
    .from("articles")
    .select(
      `
        id,
        title,
        body,
        summary,
        hits,
        thumbnail,
        created_at,
        updated_at,
        users (username, profileUrl)
      `
    )
    .match({ id: articleId })
    .throwOnError()
    .single<Article>();
};
