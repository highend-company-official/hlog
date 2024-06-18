import { useParams } from "react-router-dom";

import * as shared from "@/shared";
import { ArticleWriteContainer } from "@/widgets/article-write-container";
import { ArticleEditContainer } from "@/widgets/article-edit-container";

const ArticleWrite = () => {
  const params = useParams<{ article_id: string }>();

  const isEditMode = !!params.article_id;

  return (
    <shared.If
      condition={isEditMode}
      trueRender={
        <shared.QueryBoundary>
          <ArticleEditContainer />
        </shared.QueryBoundary>
      }
      falseRender={
        <shared.QueryBoundary>
          <ArticleWriteContainer />
        </shared.QueryBoundary>
      }
    />
  );
};

export default ArticleWrite;
