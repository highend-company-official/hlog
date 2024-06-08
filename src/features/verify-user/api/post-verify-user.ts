import { supabase } from "@/shared";

const postVerifyUser = async (userId: string) => {
  const response = await supabase
    .from("profiles")
    .update({
      verified: "pending",
    })
    .eq("id", userId)
    .throwOnError();

  return response;
};

export default postVerifyUser;
