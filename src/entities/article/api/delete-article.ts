import { supabase } from "@/shared";

const deleteArticle = async (articleId: string) => {
  const response = await supabase
    .from("articles")
    .delete()
    .eq("id", articleId)
    .throwOnError();

  return response.data;
};

export default deleteArticle;
