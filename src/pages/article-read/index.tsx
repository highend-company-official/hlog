import { Suspense } from "react";

import * as shared from "@/shared";

import { ArticleView } from "@/entities/article";
import { CommentList } from "@/entities/comment";
import CommentInput from "@/entities/comment/ui/comment-input";

import { LikeArticle } from "@/features/article/like-article";

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

      <LikeArticle />

      <shared.Divider />

      <CommentInput />

      <div className="py-6" />

      <CommentList />

      <div className="py-10" />
    </Suspense>
  );
}

export default ArticleRead;
