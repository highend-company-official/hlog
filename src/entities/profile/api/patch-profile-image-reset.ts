import { supabase } from "@/shared";

const patchProfileImageReset = async (userId: string, profileUrl: string) => {
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

export default patchProfileImageReset;
