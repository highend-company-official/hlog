import * as shared from "@/shared";

import { ArticleView } from "@/entities/article";
import { CommentList } from "@/entities/comment";

import { LikeArticle } from "@/features/article/like-article";
import { CreateCommentForm } from "@/features/comment/create-comment";

function ArticleRead() {
  return (
    <>
      <ArticleView />

      <LikeArticle />

      <shared.Divider />

      <CreateCommentForm />

      <div className="py-6" />

      <CommentList />

      <div className="py-10" />
    </>
  );
}

export default ArticleRead;
