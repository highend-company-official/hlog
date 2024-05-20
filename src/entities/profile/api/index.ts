import { ArticleType, supabase } from "@/shared";

export const fetchUserArticles = (userId: string) => {
  return supabase
    .from("articles")
    .select(
      `
        id,
        title,
        body,
        summary,
        thumbnail,
        created_at, 
        profiles (username)
      `
    )
    .eq("user_id", userId)
    .returns<ArticleType[]>();
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
