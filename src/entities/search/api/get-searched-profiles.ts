import { supabase } from "@/shared";

type ReturnType = {
  id: string;
  username: string;
  profile_url: string;
};

const getSearchedProfiles = async (search: string) =>
  supabase
    .from("profiles")
    .select("id, username, profile_url")
    .textSearch("username", search)
    .returns<ReturnType[]>();

export default getSearchedProfiles;
