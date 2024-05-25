import { Suspense } from "react";

import { ArticleView, LikeView } from "@/entities/article";
import { CommentList } from "@/entities/comment";

import * as shared from "@/shared";
import CommentInput from "@/entities/comment/ui/comment-input";

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

      <CommentInput />

      <div className="py-6" />

      <CommentList />

      <div className="py-10" />
    </Suspense>
  );
}

export default ArticleRead;
