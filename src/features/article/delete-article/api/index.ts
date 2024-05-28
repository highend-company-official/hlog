import { supabase } from "@/shared";

export const deleteArticle = async (articleIds: string[]) => {
  const response = await supabase
    .from("articles")
    .delete()
    .in("id", articleIds)
    .throwOnError()
    .select();

  return response.data;
};
