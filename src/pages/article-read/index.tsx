import { Suspense } from "react";

import { ArticleView, LikeView } from "@/entities/article";
import { CommentList } from "@/entities/comment";

import * as shared from "@/shared";

function ArticleRead() {
  return (
    <Suspense fallback={<>Suspense Loading</>}>
      {/* Article Area */}
      <ArticleView />

      {/* Like Area */}
      <LikeView />

      <shared.Divider />

      {/* Comment Area */}
      <CommentList />
    </Suspense>
  );
}

export default ArticleRead;
