import { RawDraftContentState } from "draft-js";
import { useMutation } from "@tanstack/react-query";

import { type ArticleType } from "@/shared";
import createArticle from "@/entities/article/api/create-article";

type Params = {
  articleMetaData: {
    title: string;
    thumbnail?: File;
    body: RawDraftContentState;
    summary: string;
    has_comments: boolean;
    has_like: boolean;
    has_hit: boolean;
  };
  thumbnailFile: File;
};

const useCreateArticle = () =>
  useMutation<ArticleType, Error, Params>({
    mutationFn: createArticle,
  });

export default useCreateArticle;
