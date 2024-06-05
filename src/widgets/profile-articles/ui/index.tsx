import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { ImFileEmpty } from "react-icons/im";
import { useParams } from "react-router-dom";

import { ArticleQueryKeys, useArticleStore } from "@/entities/article";
import { ProfileArticleCard } from "@/entities/profile";
import { DeleteArticleModal } from "@/features/delete-article";
import * as shared from "@/shared";

import { useFetchUserArticles } from "../lib";

type Params = {
  user_id: string;
};

const ProfileArticles = () => {
  const queryClient = useQueryClient();
  const { user_id } = useParams<Params>();

  const { data: userData } = shared.useFetchUser(user_id!);
  const { data: userArticlesData } = useFetchUserArticles(user_id!);
  const { isMySession } = shared.useIsMySession(user_id!);
  const { open: openDeleteModal } = shared.useOverlay();
  const { deleteArticleList, resetDeleteArticleList } = useArticleStore();

  const [isArticleEditMode, setIsArticleEditMode] = useState(false);

  const handleEditModeChange = () => {
    setIsArticleEditMode((prev) => !prev);
  };

  const handleOpenDeleteModal = () => {
    openDeleteModal(({ exit, isOpen }) => (
      <DeleteArticleModal
        isOpen={isOpen}
        onClose={exit}
        onDelete={handleDeleteArticle}
      />
    ));
  };

  const handleDeleteArticle = () => {
    queryClient.invalidateQueries({
      queryKey: ArticleQueryKeys.userArticles(user_id!),
    });
  };

  useEffect(() => {
    if (!isArticleEditMode) {
      resetDeleteArticleList();
    }
  }, [isArticleEditMode, resetDeleteArticleList]);

  const articleMap = useMemo(() => {
    return (
      userArticlesData.map((article) => (
        <ProfileArticleCard
          key={article.id}
          isEditMode={isArticleEditMode}
          {...article}
        />
      )) ?? []
    );
  }, [isArticleEditMode, userArticlesData]);

  if (!userArticlesData || !userData) return null;

  return (
    <>
      <shared.If
        condition={userArticlesData.length !== 0}
        trueRender={
          <>
            <div className="relative mb-4 text-xl text-center">
              <span className="font-bold">{userData.username}</span>님이 작성한
              아티클
              {isMySession && (
                <div className="flex absolute right-2 top-0">
                  <button
                    type="button"
                    className="text-black hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    onClick={handleEditModeChange}
                  >
                    {isArticleEditMode ? "취소" : "수정 및 제거"}
                  </button>

                  {deleteArticleList.length > 0 && (
                    <button
                      onClick={handleOpenDeleteModal}
                      type="button"
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                    >
                      ({deleteArticleList.length})개의 아티클 삭제하기
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className="mt-10" />
            {articleMap}
          </>
        }
        falseRender={
          <div className="flex flex-col items-center justify-center my-8">
            <ImFileEmpty size={30} />
            <p className="mt-4 text-2xl">
              해당 유저가 작성한 작성한 아티클이 없습니다.
            </p>
          </div>
        }
      />
    </>
  );
};

export default ProfileArticles;
