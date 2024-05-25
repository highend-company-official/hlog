import { useToastStore } from "@/app/store";
import * as shared from "@/shared";
import { useState } from "react";
import { BiSolidLike } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { usePostArticleLike } from "../../lib";

type Params = {
  article_id: string;
};

const LiveView = () => {
  const params = useParams<Params>();
  const navigate = useNavigate();
  const { addToast } = useToastStore();
  const { mutateAsync } = usePostArticleLike(params.article_id!);

  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  const handleLikeArticle = () => {
    mutateAsync()
      .then(() => {
        addToast({
          type: "success",
          content: "좋아요를 눌렀습니다.",
          staleTime: 3000,
        });
      })
      .catch((response) => {
        if (response.code === "42501") {
          // 권환 없을 경우
          setIsSignInModalOpen(true);
          return;
        }
        addToast({
          type: "error",
          content: "좋아요에 실패했습니다. 다시 시도해보세요.",
          staleTime: 3000,
        });
      });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center py-6 mt-20">
        <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900">
          게시글이 마음에 드셨나요?
        </h5>
        <p className="mb-3 font-normal text-gray-700">
          글에 좋아요를 눌러주세요!
        </p>
        <shared.Button
          className="flex justify-center w-32"
          onClick={handleLikeArticle}
        >
          <BiSolidLike className="mr-1" />
          좋아요
        </shared.Button>
      </div>

      <shared.If
        condition={isSignInModalOpen}
        trueRender={
          <shared.Modal>
            <shared.Modal.Header>
              로그인이 필요한 서비스입니다.
            </shared.Modal.Header>
            <shared.Modal.Content>로그인 하시겠습니까?</shared.Modal.Content>
            <shared.Modal.Footer align="right">
              <shared.Modal.Button onClick={() => setIsSignInModalOpen(false)}>
                아니요
              </shared.Modal.Button>
              <div className="ml-2"></div>
              <shared.Modal.Button
                onClick={() => {
                  navigate("/auth/sign-in");
                  setIsSignInModalOpen(false);
                }}
                type="accept"
              >
                네
              </shared.Modal.Button>
            </shared.Modal.Footer>
          </shared.Modal>
        }
      />
    </>
  );
};

export default LiveView;
