import { supabase } from "@/shared";

const deleteComment = async (commentId: string) => {
  const response = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId)
    .throwOnError();

  return response;
};

export default deleteComment;
