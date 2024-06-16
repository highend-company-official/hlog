import { supabase } from "@/shared";

const fetchUserArticles = async (userId: string) => {
  const baseQuery = supabase
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
    categories(category),
    comments(count)
    `
    )
    .eq("user_id", userId)
    .throwOnError();

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

export default fetchUserArticles;
