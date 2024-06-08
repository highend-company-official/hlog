import { supabase } from "@/shared";

type ArticleResponseType = {
  id: string;
  created_at: Date;
  title: string;
  body: string;
  thumbnail: string;
  summary: string;
  verified: "verified" | "pending" | "none";
  user_id: string;
  has_comments: boolean;
  has_like: boolean;
  has_hit: boolean;
  hits: number;
  profiles: {
    id: string;
    username: string;
    profile_url: string;
  };
  likes: {
    count: number;
  }[];
};

const getArticleById = (articleId: string) =>
  supabase
    .from("articles")
    .select("*, profiles(id,profile_url,username), likes(count)")
    .eq("id", articleId)
    .throwOnError()
    .single<ArticleResponseType>();

export default getArticleById;
