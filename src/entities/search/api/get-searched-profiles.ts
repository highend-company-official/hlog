import { supabase } from "@/shared";

const getSearchedProfiles = async (search: string) => {
  const baseQuery = supabase
    .from("profiles")
    .select(
      `
      id,
      profile_url,
      username,
      description,
      verified
      `
    )
    .throwOnError()
    .textSearch("username", search);

  const { data, error } = await baseQuery;

  if (error) {
    throw error;
  }

  return data;
};

export default getSearchedProfiles;
