import { supabase } from "@/shared";

const getTopNotice = async () => {
  const baseQuery = supabase
    .from("notices")
    .select("*")
    .throwOnError()
    .order("created_at", { ascending: false })
    .limit(1);

  const { data, error } = await baseQuery;

  if (error) throw error;

  return data?.[0] ? data[0] : null;
};

export default getTopNotice;
