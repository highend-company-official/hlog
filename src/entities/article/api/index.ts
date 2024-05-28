import { SortType } from "@/entities/article/model";
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

export const fetchArticle = (articleId: string) => {
  return supabase
    .rpc("get_article_by_id", { article_id_param: articleId })
    .throwOnError()
    .single<ArticleResponseType>();
};

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

export const fetchArticles = (sortType: SortType) => {
  const baseQuery = supabase.rpc("get_articles");

  if (sortType === SortType.new) {
    return baseQuery
      .order("created_at", { ascending: false })
      .returns<ArticlesResponseType[]>();
  }

  if (sortType === SortType.old) {
    return baseQuery
      .order("created_at", { ascending: true })
      .returns<ArticlesResponseType[]>();
  }

  if (sortType === SortType.trend) {
    return baseQuery
      .order("likes", { ascending: false })
      .order("created_at", { ascending: false })
      .returns<ArticlesResponseType[]>();
  }

  return baseQuery.returns<ArticlesResponseType[]>();
};

export const patchArticleHit = (articleId: string) =>
  supabase.rpc("increase_article_like", { article_id_param: articleId });

export const patchArticleHits = (articleId: string) =>
  supabase.rpc("increment_article_hits", { article_id: articleId });
