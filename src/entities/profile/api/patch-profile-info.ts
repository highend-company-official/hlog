import { supabase } from "@/shared";

export type InfoType = {
  email: string;
  phone: string;
  link: string;
};

const patchProfileInfo = async (userId: string, info: InfoType) => {
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

export default patchProfileInfo;
