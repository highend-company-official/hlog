import { useMutation } from "@tanstack/react-query";
import { deleteArticle } from "../api/delete-article";

const useDeleteArticle = () =>
  useMutation({
    mutationFn: deleteArticle,
  });

export default useDeleteArticle;
