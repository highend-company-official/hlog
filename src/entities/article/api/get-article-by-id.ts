import { supabase } from "@/shared";

const getArticleById = async (articleId: string) => {
  const response = await supabase
    .from("articles")
    .select("*, profiles(id,profile_url,username), likes(count), categories(*)")
    .eq("id", articleId)
    .throwOnError()
    .single();

  const { data, error } = response;

  if (error) {
    throw error;
  }

  const article = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    summary: data.summary,
    body: data.body,
    hits: data.hits,
    created_at: new Date(data.created_at),
    has_like: data.has_like,
    has_hit: data.has_hit,
    has_comments: data.has_comments,
    likes: data.likes,
    categories: data.categories,
    profile: {
      id: data.profiles!.id,
      profile_url: data.profiles!.profile_url,
      username: data.profiles!.username,
    },
  };

  return article;
};
export default getArticleById;
