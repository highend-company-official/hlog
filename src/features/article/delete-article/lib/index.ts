import { useMutation } from "@tanstack/react-query";
import { deleteArticle } from "../api";

const useDeleteArticle = () =>
  useMutation({
    mutationFn: deleteArticle,
  });

export default useDeleteArticle;
