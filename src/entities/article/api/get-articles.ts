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
      categories(category),
      likes(count),
      comments(count)
      `
    )
    .throwOnError();

  if (filterType.sortType === SortType.new) {
    baseQuery = baseQuery.order("created_at", { ascending: false });
  } else if (filterType.sortType === SortType.old) {
    baseQuery = baseQuery.order("created_at", { ascending: true });
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

  const from = filterType.page * 10;
  const to = from + 10 - 1;

  const { data, error } = await baseQuery.range(from, to);

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
    likeCount: article.likes[0].count ?? 0,
    commentCount: article.comments[0].count ?? 0,
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
