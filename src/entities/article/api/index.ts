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
        profiles (id, username, profile_url)
      `
    )
    .match({ id: articleId })
    .throwOnError()
    .single<ArticleType>();
};

type ResponseType = {
  id: string;
  has_comments: boolean;
  has_hit: boolean;
  has_like: boolean;
  hits: number;
  likes: number;
  created_at: Date;
  profile_url: string;
  summary: string;
  thumbnail: string;
  title: string;
  user_id: string;
  username: string;
};

export const fetchArticles = (sortType: SortType) => {
  const baseQuery = supabase.rpc("get_articles_with_likes");

  if (sortType === SortType.new) {
    return baseQuery
      .order("created_at", { ascending: false })
      .returns<ResponseType[]>();
  }

  if (sortType === SortType.old) {
    return baseQuery
      .order("created_at", { ascending: true })
      .returns<ResponseType[]>();
  }

  return baseQuery.returns<ResponseType[]>();
};

// export const patchArticleHit = () => {
//   return supabase.from("articles").update({
//     hits: 1,
//   }).
// };
