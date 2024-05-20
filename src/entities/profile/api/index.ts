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

export const patchProfileImageReset = async (userId: string) => {
  await supabase.storage.from("profiles").remove([`${userId}.png`]);

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
  await supabase.storage.from("profiles").upload(`${userId}`, profile, {
    cacheControl: "3600",
    upsert: false,
  });

  await supabase
    .from("profiles")
    .update({
      profile_url: userId,
    })
    .eq("id", userId)
    .throwOnError()
    .select();
};
