import { supabase } from "@/shared";

const getSearchedArticles = async () => {
  const baseQuery = supabase
    .from("articles")
    .select(
      `
      id, 
      created_at, 
      title, 
      thumbnail, 
      summary,  
      profiles(id, username),
      likes(count),
      categories(category)
      `
    )
    .throwOnError();

  const { data, error } = await baseQuery;

  if (error) {
    throw error;
  }

  const searchedArticles = data.map(({ profiles, ...article }) => ({
    id: article.id,
    title: article.title,
    thumbnail: article.thumbnail,
    summary: article.summary,
    created_at: new Date(article.created_at),
    likes: article.likes?.[0]?.count ?? 0,
    categories: article.categories.map(({ category }) => category),
    profile: {
      id: profiles!.id,
      username: profiles!.username,
    },
  }));

  return searchedArticles;
};

export default getSearchedArticles;
