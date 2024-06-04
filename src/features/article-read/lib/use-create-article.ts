import { useMutation } from "@tanstack/react-query";
import { RawDraftContentState } from "draft-js";

import { type ArticleType } from "@/shared";

import { createArticle } from "../api";

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
