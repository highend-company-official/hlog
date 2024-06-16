import { supabase } from "@/shared";

const getNotices = async () => {
  const baseQuery = supabase
    .from("notices")
    .select("id, title, created_at")
    .order("created_at", { ascending: false })
    .throwOnError();

  const { data, error } = await baseQuery;

  if (error) throw error;

  return data;
};

export default getNotices;
