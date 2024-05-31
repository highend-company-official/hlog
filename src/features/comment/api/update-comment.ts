import { supabase } from "@/shared";

const updateComment = async (commentId: string, body: string) => {
  const response = await supabase
    .from("comments")
    .update({ body })
    .eq("id", commentId)
    .throwOnError()
    .select();

  return response.data;
};

export default updateComment;
