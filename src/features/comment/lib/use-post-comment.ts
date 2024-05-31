import { useMutation } from "@tanstack/react-query";

import { postComment } from "../api";

const usePostComment = (articleId: string) =>
  useMutation({
    mutationFn: (body: string) => postComment(articleId, body),
  });

export default usePostComment;
