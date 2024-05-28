import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BiSolidLike } from "react-icons/bi";
import { FaLock, FaRegCircleCheck } from "react-icons/fa6";

import { useToastStore } from "@/app/model";
import * as shared from "@/shared";

import { useGetUserArticleLiked, usePostArticleLike } from "../lib";
import { useSession } from "@/shared";
import { useQueryClient } from "@tanstack/react-query";

type Params = {
  article_id: string;
};

const AuthenticatedView = () => {
  const params = useParams<Params>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();
  const { data: session } = useSession();
  const { data: isLikedArticle } = useGetUserArticleLiked(
    session?.user.id ?? "",
    params.article_id ?? ""
  );

  const { mutateAsync, isPending } = usePostArticleLike(
    session!.user.id!,
    params.article_id!
  );

  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  const handleLikeArticle = () => {
    mutateAsync()
      .then(() => {
        addToast({
          type: "success",
          content: "좋아요를 눌렀습니다.",
          staleTime: 3000,
        });
        queryClient.invalidateQueries({
          queryKey: useGetUserArticleLiked.pk(
            session!.user.id,
            params.article_id!
          ),
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
        {!isLikedArticle ? (
          <>
            <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900">
              게시글이 마음에 드셨나요?
            </h5>
            <p className="mb-3 font-normal text-gray-700">
              글에 좋아요를 눌러주세요!
            </p>
            <shared.Button
              className="flex justify-center w-32"
              onClick={handleLikeArticle}
              disabled={isPending}
            >
              <BiSolidLike className="mr-1" />
              좋아요
            </shared.Button>
          </>
        ) : (
          <>
            <FaRegCircleCheck size={60} className="text-primary mb-8" />
            <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900">
              게시글에 의견을 남겨주셔서 감사합니다.
            </h5>
          </>
        )}
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

const UnauthenticatedView = () => {
  return (
    <div className="relative mb-5">
      <div className="absolute z-20 flex items-center justify-center flex-col w-full">
        <FaLock size={80} className="text-black/90" />
        <h3 className="font-bold text-2xl mt-5">
          좋아요 기능은 로그인 후 이용 가능합니다.
        </h3>
      </div>
      <div className="blur-md select-none">
        <div className="flex flex-col items-center justify-center py-6 mt-20">
          <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900">
            게시글이 마음에 드셨나요?
          </h5>
          <p className="mb-3 font-normal text-gray-700">
            글에 좋아요를 눌러주세요!
          </p>
          <shared.Button className="flex justify-center w-32">
            <BiSolidLike className="mr-1" />
            좋아요
          </shared.Button>
        </div>
      </div>
    </div>
  );
};

const LikeArticle = () => {
  return (
    <shared.Authentication
      authenticatedView={<AuthenticatedView />}
      unauthenticatedView={<UnauthenticatedView />}
    />
  );
};

export default LikeArticle;
