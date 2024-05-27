import { useMutation } from "@tanstack/react-query";
import { type ArticleType } from "@/shared";
import { postArticle, type Params } from "../api";

const usePostArticle = () =>
  useMutation<ArticleType, Error, Params>({
    mutationFn: postArticle,
  });

export default usePostArticle;
