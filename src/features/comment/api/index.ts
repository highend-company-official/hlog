import { CommentType, supabase } from "@/shared";

export const postComment = async (
  articleId: string,
  body: string
): Promise<CommentType> => {
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

export const deleteComment = async (commentId: string) => {
  const response = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId)
    .throwOnError();

  return response;
};

export const updateComment = async (commentId: string, body: string) => {
  const response = await supabase
    .from("comments")
    .update({ body })
    .eq("id", commentId)
    .throwOnError()
    .select();

  return response.data;
};
