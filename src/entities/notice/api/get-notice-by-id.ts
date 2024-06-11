import { supabase } from "@/shared";

const getNoticeById = async (id: string) => {
  const baseQuery = supabase
    .from("notices")
    .select("*")
    .eq("id", id)
    .throwOnError();

  const { data, error } = await baseQuery;

  if (error) throw error;

  return data[0];
};

export default getNoticeById;
