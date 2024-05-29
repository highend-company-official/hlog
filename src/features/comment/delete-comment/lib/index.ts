import { useMutation } from "@tanstack/react-query";
import { deleteComment } from "../api";

export const useDeleteComment = () =>
  useMutation({
    mutationFn: deleteComment,
  });
