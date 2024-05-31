import { useMutation } from "@tanstack/react-query";
import { type ArticleType } from "@/shared";
import { createArticle, type Params } from "../api/create-article";

const useCreateArticle = () =>
  useMutation<ArticleType, Error, Params>({
    mutationFn: createArticle,
  });

export default useCreateArticle;
