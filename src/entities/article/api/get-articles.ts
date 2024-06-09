import { supabase } from "@/shared";

import { ArticleFilterType } from "../query";
import { SortType } from "../model";

const getArticles = async (filterType: ArticleFilterType) => {
  let baseQuery = supabase
    .from("articles")
    .select(
      `
      id, 
      created_at, 
      title, 
      thumbnail, 
      summary, 
      has_comments, 
      has_like, 
      has_hit, 
      hits, 
      profiles(id, profile_url, username),
      likes(count),
      categories(category)
      `
    )
    .throwOnError();

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

  const articles = data.map(({ profiles, ...article }) => ({
    id: article.id,
    title: article.title,
    thumbnail: article.thumbnail,
    summary: article.summary,
    hits: article.hits,
    created_at: new Date(article.created_at),
    has_like: article.has_like,
    has_hit: article.has_hit,
    has_comments: article.has_comments,
    likes: article.likes?.[0]?.count ?? 0,
    categories: article.categories.map(({ category }) => category),
    profile: {
      id: profiles!.id,
      profile_url: profiles!.profile_url,
      username: profiles!.username,
    },
  }));

  return articles;
};

export default getArticles;
