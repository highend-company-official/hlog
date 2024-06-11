import { supabase } from "@/shared";

const createComment = async (articleId: string, body: string) => {
  const response = await supabase
    .from("comments")
    .insert({
      body,
      article_id: articleId,
    })
    .throwOnError()
    .select()
    .throwOnError()
    .single();

  return response.data;
};

export default createComment;
