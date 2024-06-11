import { useMutation } from "@tanstack/react-query";

import { EditorMetaData, editArticle } from "@/entities/article";

const useEditArticle = (articleId: string) =>
  useMutation({
    mutationFn: (editorMetaData: EditorMetaData & { content: string }) =>
      editArticle(articleId, editorMetaData),
  });

export default useEditArticle;
