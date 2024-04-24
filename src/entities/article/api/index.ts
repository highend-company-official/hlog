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
        thumbnail,
        created_at,
        profiles (username, profileUrl)
      `
    )
    .match({ id: articleId })
    .throwOnError()
    .single<Article>();
};

export const fetchArticles = () => {
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
    .returns<Article[]>();
};
