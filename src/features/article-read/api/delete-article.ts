import { supabase } from "@/shared";

const deleteArticle = async (articleIds: string[]) => {
  const response = await supabase
    .from("articles")
    .delete()
    .in("id", articleIds)
    .throwOnError();

  return response.data;
};

export default deleteArticle;
