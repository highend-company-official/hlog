import { Suspense } from "react";
import { EditorState, convertFromRaw } from "draft-js";
import { useNavigate, useParams } from "react-router-dom";

import * as shared from "@/shared";
import { EditorCore } from "@/widgets/editor";
import { CommentCard, CommentList } from "@/widgets/comment-list";
import { ArticleDetailTemplate } from "@/widgets/article-detail-view";
import { useGetArticleById } from "@/entities/article";
import { CreateCommentForm } from "@/features/create-comment";
import { LikeArticleButton } from "@/features/like-article";

function ArticleRead() {
  const params = useParams<{ article_id: string }>();
  const navigate = useNavigate();
  const { data } = useGetArticleById(params.article_id!);

  if (!data) {
    return (
      <div className="p-8 text-center bg-white w-full flex items-center justify-center flex-col">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="text-gray-600">아티클을 찾을 수 없습니다.</p>
        <div
          onClick={() => navigate(-1)}
          className="inline-block px-4 py-2 mt-4 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 cursor-pointer"
        >
          뒤로 돌아가기
        </div>
      </div>
    );
  }

  const editorState = EditorState.createWithContent(
    convertFromRaw(JSON.parse(data.body))
  );

  return (
    <Suspense>
      <ArticleDetailTemplate {...data}>
        <EditorCore readOnly editorState={editorState} />
      </ArticleDetailTemplate>

      <LikeArticleButton />

      <shared.Divider />

      <CreateCommentForm />

      <div className="py-6" />

      <CommentList renderCard={CommentCard} />

      <div className="mb-10" />
    </Suspense>
  );
}

export default ArticleRead;
