import { useNavigate, useParams } from "react-router-dom";

import { Divider, If, SEO, useBucket } from "@/shared";
import { EditorCore, useEditorUtils } from "@/widgets/editor";
import { useGetArticleById } from "@/entities/article";
import { LikeArticleButton } from "@/features/like-article";
import { CreateCommentForm } from "@/features/create-comment";
import { CommentCard, CommentList } from "@/widgets/comment-list";

import MetaDataView from "./meta-data-view";

const ArticleDetailViewContainer = () => {
  const navigate = useNavigate();
  const params = useParams<{ article_id: string }>();
  const { parseSavedContentToState } = useEditorUtils();
  const { read: readThumbnails } = useBucket("thumbnails");
  const { data } = useGetArticleById(params.article_id!);

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center w-full p-8 text-center bg-white pt-52">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="text-gray-600">아티클을 찾을 수 없습니다.</p>
        <div
          onClick={() => navigate(-1)}
          className="inline-block px-4 py-2 mt-4 font-semibold text-white bg-blue-500 rounded cursor-pointer hover:bg-blue-600"
        >
          뒤로 돌아가기
        </div>
      </div>
    );
  }

  const editorState = parseSavedContentToState(data.body ?? "");

  return (
    <>
      <SEO
        title={`HLOG | ${data.title}`}
        description={data.summary ?? undefined}
        url={`https://tech-hlog.vercel.app/article-read/${data.id}`}
        image={readThumbnails(data.thumbnail ?? "")}
        keywords="기술 블로그, 최신 기술 뉴스, 튜토리얼, 프로그래밍, 소프트웨어 개발, AI, 머신러닝, 데이터 과학"
      />

      <article className="grid content-center grid-cols-10 pt-24 mx-8">
        <MetaDataView {...data} />

        <div className="col-span-6 col-start-3 max-md:col-span-10 max-md:col-start-1">
          <EditorCore readOnly editorState={editorState} />

          <If
            condition={data.has_like ?? true}
            trueRender={<LikeArticleButton />}
            falseRender={
              <div className="p-4 text-blue-700 bg-blue-100 rounded-md shadow-md">
                <p className="font-semibold">
                  좋아요 기능이 비활성화되었습니다.
                </p>
                <p className="text-sm">
                  작성자가 이 글에 대해 좋아요 기능을 사용할 수 없게
                  설정했습니다.
                </p>
              </div>
            }
          />

          <div className="my-4">
            <Divider />
          </div>

          <If
            condition={data.has_comments ?? true}
            trueRender={
              <>
                <CreateCommentForm />

                <div className="py-6" />

                <CommentList renderCard={CommentCard} />
              </>
            }
            falseRender={
              <div className="p-4 text-blue-700 bg-blue-100 rounded-md shadow-md">
                <p className="font-semibold">댓글 기능이 비활성화되었습니다.</p>
                <p className="text-sm">
                  작성자가 이 글에 대해 댓글 기능을 사용할 수 없게 설정했습니다.
                </p>
              </div>
            }
          />
          <div className="mb-10" />
        </div>
      </article>
    </>
  );
};

export default ArticleDetailViewContainer;
