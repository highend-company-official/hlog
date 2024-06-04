import { useMutation } from "@tanstack/react-query";

import { deleteArticle } from "@/entities/article";

const useDeleteArticle = () =>
  useMutation({
    mutationFn: deleteArticle,
  });

export default useDeleteArticle;
