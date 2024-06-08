import { supabase } from "@/shared";

type ArticlesResponseType = {
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

const fetchUserArticles = (userId: string) => {
  return supabase
    .rpc("get_articles")
    .eq("user_id", userId)
    .returns<ArticlesResponseType[]>();
};

export default fetchUserArticles;
