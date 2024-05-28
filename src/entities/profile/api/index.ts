import { supabase } from "@/shared";

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

export const fetchUserArticles = (userId: string) => {
  return supabase
    .rpc("get_articles")
    .eq("user_id", userId)
    .returns<ArticlesResponseType[]>();
};

export const patchProfileImageReset = async (
  userId: string,
  profileUrl: string
) => {
  await supabase.storage.from("profiles").remove([profileUrl]);

  const response = await supabase
    .from("profiles")
    .update({
      profile_url: null,
    })
    .eq("id", userId)
    .throwOnError()
    .select();

  return response.data;
};

export const patchProfileImage = async (userId: string, profile: File) => {
  const extension = profile.name.split(".").pop();
  const fileUrl = `${userId}.${extension}`;

  await supabase.storage.from("profiles").upload(fileUrl, profile, {
    cacheControl: "3600",
    upsert: false,
  });

  await supabase
    .from("profiles")
    .update({
      profile_url: fileUrl,
    })
    .eq("id", userId)
    .throwOnError()
    .select();
};

export type InfoType = {
  email: string;
  phone: string;
  link: string;
};

export const patchProfileInfo = async (userId: string, info: InfoType) => {
  await supabase
    .from("profiles")
    .update({
      link: info.link,
      email: info.email,
      phone: info.phone,
    })
    .eq("id", userId)
    .throwOnError()
    .select();
};
