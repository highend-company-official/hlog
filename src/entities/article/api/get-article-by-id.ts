import { supabase } from "@/shared";

type ArticleResponseType = {
  id: string;
  has_comments: boolean;
  has_hit: boolean;
  has_like: boolean;
  hits: number;
  likes: number;
  created_at: Date;
  profile_url: string;
  summary: string;
  body: string;
  thumbnail: string;
  title: string;
  user_id: string;
  username: string;
};

const getArticleById = (articleId: string) => {
  return supabase
    .rpc("get_article_by_id", { article_id_param: articleId })
    .throwOnError()
    .single<ArticleResponseType>();
};

export default getArticleById;
