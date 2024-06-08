import { supabase } from "@/shared";

import { ArticleFilterType } from "../query";
import { SortType } from "../model";

type ArticleResponseType = {
  id: string;
  created_at: Date;
  title: string;
  thumbnail: string;
  summary: string;
  verified: "pending" | "verified" | "none";
  has_comments: boolean;
  has_like: boolean;
  has_hit: boolean;
  hits: number;
  likes: number;
  profile: {
    id: string;
    username: string;
    profile_url: string;
  };
  categories: {
    category: string;
  }[];
};

const getArticles = async (filterType: ArticleFilterType) => {
  let baseQuery = supabase
    .from("articles")
    .select(
      `
      *,
      profiles(id, profile_url, username),
      likes(count),
      categories(category)
      `
    )
    .throwOnError();

  if (filterType.search) {
    baseQuery = baseQuery.ilike("title", `%${filterType.search}%`);
  }

  if (filterType.categories && filterType.categories.length > 0) {
    const categoryIds = filterType.categories;

    const { data: categoryArticleIds, error } = await supabase
      .from("article_categories")
      .select("article_id")
      .in("category_id", categoryIds);

    if (error) {
      throw error;
    }

    if (categoryArticleIds) {
      baseQuery = baseQuery.in(
        "id",
        categoryArticleIds.map((item) => item.article_id)
      );
    }
  }

  if (filterType.userId) {
    baseQuery = baseQuery.eq("user_id", filterType.userId);
  }

  if (filterType.sortType === SortType.new) {
    baseQuery = baseQuery.order("created_at", { ascending: false });
  } else if (filterType.sortType === SortType.old) {
    baseQuery = baseQuery.order("created_at", { ascending: true });
  } else if (filterType.sortType === SortType.trend) {
    baseQuery = baseQuery.order("count", {
      referencedTable: "likes",
      ascending: false,
    });
  }

  const { data, error } = await baseQuery;

  if (error) {
    throw error;
  }

  const articles: ArticleResponseType[] = data.map((article) => ({
    id: article.id,
    title: article.title,
    thumbnail: article.thumbnail,
    summary: article.summary,
    hits: article.hits,
    created_at: new Date(article.created_at),
    verified: article.verified,
    has_like: article.has_like,
    has_hit: article.has_hit,
    user_id: article.user_id,
    has_comments: article.has_comments,
    likes: article.likes?.[0]?.count ?? 0,
    profile: {
      id: article.profiles.id,
      profile_url: article.profiles.profile_url,
      username: article.profiles.username,
    },
    categories: article.article_categories,
  }));

  return articles;
};

export default getArticles;
