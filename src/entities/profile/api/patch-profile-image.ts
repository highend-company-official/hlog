import { supabase } from "@/shared";

const patchProfileImage = async (userId: string, profile: File) => {
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

export default patchProfileImage;
