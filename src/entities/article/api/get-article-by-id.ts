import { supabase } from "@/shared";

type ArticleResponseType = {
  id: string;
  created_at: Date;
  title: string;
  thumbnail: string;
  summary: string;
  body: string;
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
  categories: string[];
};

const getArticleById = async (articleId: string) => {
  const response = await supabase
    .from("articles")
    .select(
      "*, profiles(id,profile_url,username), likes(count), categories(category)"
    )
    .eq("id", articleId)
    .throwOnError()
    .single();

  const { data, error } = response;

  if (error) {
    throw error;
  }

  const article: ArticleResponseType = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    summary: data.summary,
    body: data.body,
    hits: data.hits,
    created_at: new Date(data.created_at),
    verified: data.verified,
    has_like: data.has_like,
    has_hit: data.has_hit,
    has_comments: data.has_comments,
    likes: data.likes,
    profile: {
      id: data.profiles.id,
      profile_url: data.profiles.profile_url,
      username: data.profiles.username,
    },
    categories: data.categories.map(
      ({ category }: { category: string }) => category
    ),
  };

  return article;
};
export default getArticleById;
