import { useMutation } from "@tanstack/react-query";

import { createArticle } from "@/entities/article";

const useCreateArticle = () =>
  useMutation({
    mutationFn: createArticle,
  });

export default useCreateArticle;
