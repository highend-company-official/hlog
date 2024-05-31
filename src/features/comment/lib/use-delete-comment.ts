import { useMutation } from "@tanstack/react-query";

import { deleteComment } from "../api";

const useDeleteComment = () =>
  useMutation({
    mutationFn: deleteComment,
  });

export default useDeleteComment;
