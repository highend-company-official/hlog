import { useMutation } from "@tanstack/react-query";

import { deleteComment } from "@/entities/comment";

const useDeleteComment = () =>
  useMutation({
    mutationFn: deleteComment,
  });

export default useDeleteComment;
