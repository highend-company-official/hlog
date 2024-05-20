import { SortType } from "@/app/store/article";
import { ArticleType, supabase } from "@/shared";

export const fetchArticle = (articleId: string) => {
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
        profiles (username, profile_url)
      `
    )
    .match({ id: articleId })
    .throwOnError()
    .single<ArticleType>();
};

export const fetchArticles = (sortType: SortType) => {
  if (sortType === SortType.new) {
    return supabase
      .from("articles")
      .select(
        `
          id,
          title,
          summary,
          thumbnail,
          created_at, 
          profiles (username, profile_url)
        `
      )
      .order("created_at", { ascending: false })
      .returns<ArticleType[]>();
  }

  if (sortType === SortType.old) {
    return supabase
      .from("articles")
      .select(
        `
          id,
          title,
          summary,
          thumbnail,
          created_at, 
          profiles (username, profile_url)
        `
      )
      .order("created_at", { ascending: true })
      .returns<ArticleType[]>();
  }

  return supabase
    .from("articles")
    .select(
      `
          id,
          title,
          summary,
          thumbnail,
          created_at, 
          profiles (username, profile_url)
        `
    )
    .order("created_at", { ascending: false })
    .order("hits", { ascending: false })
    .returns<ArticleType[]>();
};

// export const patchArticleHit = () => {
//   return supabase.from("articles").update({
//     hits: 1,
//   }).
// };
