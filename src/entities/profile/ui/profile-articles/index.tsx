import { useParams } from "react-router-dom";
import { ImFileEmpty } from "react-icons/im";

import * as shared from "@/shared";
import { useFetchUserArticles } from "../../lib";
import { ArticleCard } from "@/entities/article";

type Params = {
  user_id: string;
};

const ProfileArticles = () => {
  const { user_id } = useParams<Params>();

  const { data: userData } = shared.useFetchUser(user_id!);
  const { data: userArticlesData } = useFetchUserArticles(user_id!);

  if (!userArticlesData || !userData) return null;

  const articleMap =
    userArticlesData.map((article) => (
      <ArticleCard viewMode="list" key={article.id} {...article} />
    )) ?? [];

  return (
    <div>
      <shared.If
        condition={userArticlesData.length !== 0}
        trueRender={
          <>
            <div className="mb-4 text-xl text-center">
              <span className="font-bold">{userData.username}</span>님이 작성한
              아티클
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
    </div>
  );
};

export default ProfileArticles;
