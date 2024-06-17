import { useMemo } from "react";
import { ImFileEmpty } from "react-icons/im";
import { useParams } from "react-router-dom";

import { ProfileArticleCard } from "@/entities/profile";
import * as shared from "@/shared";

import { useFetchUserArticles } from "../lib";

type Params = {
  user_id: string;
};

const ProfileArticlesContainer = () => {
  const { user_id } = useParams<Params>();

  const { data: userArticlesData } = useFetchUserArticles(user_id!);
  const profile = shared.useProfile(user_id);

  const articleMap = useMemo(() => {
    return (
      userArticlesData.map((article) => (
        <ProfileArticleCard key={article.id} {...article} />
      )) ?? []
    );
  }, [userArticlesData]);

  if (!userArticlesData || !profile) return null;

  return (
    <>
      <shared.SEO
        title={`HLOG | ${profile.username}남의 프로필`}
        image={profile?.profile_url}
        keywords="기술 블로그, 최신 기술 뉴스, 튜토리얼, 프로그래밍, 소프트웨어 개발, AI, 머신러닝, 데이터 과학"
      />

      <header className="pb-4 mb-10 border-b border-solid">
        <h2 className="text-4xl font-semibold">유저 아티클</h2>
        <span className="text-sm text-subTitle">
          유저가 작성한 아티클 정보들을 나타냅니다.
        </span>
      </header>

      <shared.If
        condition={userArticlesData.length !== 0}
        trueRender={articleMap}
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

export default ProfileArticlesContainer;
