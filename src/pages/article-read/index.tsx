import { Suspense } from "react";

import { ArticleView, LikeView } from "@/entities/article";
import { CommentList } from "@/entities/comment";

import * as shared from "@/shared";

const Skeleton = () => {
  return (
    <>
      <shared.ImageSkeleton />

      <div className="mt-14" />

      <shared.TextSkeleton repeat={5} />
    </>
  );
};

function ArticleRead() {
  return (
    <Suspense fallback={<Skeleton />}>
      <ArticleView />

      <LikeView />

      <shared.Divider />

      <CommentList />
    </Suspense>
  );
}

export default ArticleRead;
