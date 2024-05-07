import { useParams } from "react-router-dom";
import { ImFileEmpty } from "react-icons/im";

import * as shared from "@/shared";
import { useFetchUserArticles } from "../../lib";

const ArticleItem = () => {
  return (
    <div className="flex">
      <img src="" alt="" />

      <div>
        <h3>타이틀</h3>
        <span>설명</span>
      </div>
    </div>
  );
};

type Params = {
  user_id: string;
};

const ProfileArticles = () => {
  const { user_id } = useParams<Params>();

  const { data: userArticlesData } = useFetchUserArticles(user_id!);

  if (!userArticlesData) return null;

  return (
    <div>
      <shared.If
        condition={userArticlesData.length === 0}
        trueRender={
          <div className="flex flex-col items-center justify-center my-8">
            <ImFileEmpty size={30} />
            <p className="mt-4 text-2xl">
              해당 유저가 작성한 작성한 아티클이 없습니다.
            </p>
          </div>
        }
        falseRender={userArticlesData.map((article) => (
          <ArticleItem key={article.id} />
        ))}
      />
    </div>
  );
};

export default ProfileArticles;
