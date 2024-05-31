import { supabase } from "@/shared";

import { SortType } from "../model";

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

const getArticles = (sortType: SortType) => {
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

export default getArticles;
