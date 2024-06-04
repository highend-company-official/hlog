import { useMutation } from "@tanstack/react-query";

import { createComment } from "@/entities/comment";

const useCreateComment = (articleId: string) =>
  useMutation({
    mutationFn: (body: string) => createComment(articleId, body),
  });

export default useCreateComment;
