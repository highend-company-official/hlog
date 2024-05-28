import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { ImFileEmpty } from "react-icons/im";

import * as shared from "@/shared";

import useArticleStore from "@/entities/article/model";
import { ProfileArticleCard } from "@/entities/profile";

import { useFetchUserArticles } from "../lib";
import DeleteArticleModal from "@/features/article/delete-article/ui";
import { useQueryClient } from "@tanstack/react-query";
import { useIsMySession } from "@/shared";

type Params = {
  user_id: string;
};

const ProfileArticles = () => {
  const queryClient = useQueryClient();
  const { user_id } = useParams<Params>();

  const { data: userData } = shared.useFetchUser(user_id!);
  const { data: userArticlesData } = useFetchUserArticles(user_id!);
  const { isMySession } = useIsMySession(user_id!);
  const { deleteArticleList, resetDeleteArticleList } = useArticleStore();

  const [isArticleEditMode, setIsArticleEditMode] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEditModeChange = () => {
    if (isArticleEditMode) {
      setIsArticleEditMode(false);
      return;
    }
    setIsArticleEditMode(true);
  };

  const handleDeleteArticle = () => {
    queryClient.invalidateQueries({
      queryKey: useFetchUserArticles.pk(user_id!),
    });
  };

  useEffect(() => {
    if (isArticleEditMode === false) {
      resetDeleteArticleList();
    }
  }, [isArticleEditMode, resetDeleteArticleList]);

  const articleMap = useMemo(() => {
    return (
      userArticlesData.map((article) => (
        <ProfileArticleCard
          key={article.id}
          {...article}
          isEditMode={isArticleEditMode}
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
                    className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    onClick={handleEditModeChange}
                  >
                    {isArticleEditMode ? "취소" : "수정하기"}
                  </button>

                  {deleteArticleList.length > 0 && (
                    <button
                      onClick={() => setIsDeleteModalOpen(true)}
                      type="button"
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                    >
                      ({deleteArticleList.length})개의 아티클 삭제하기
                    </button>
                  )}
                </div>
              )}
            </div>
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

      <DeleteArticleModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDeleteArticle}
      />
    </>
  );
};

export default ProfileArticles;
