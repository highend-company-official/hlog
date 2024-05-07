import { ImFileEmpty } from "react-icons/im";

import { useFetchArticles } from "../../lib";
import * as shared from "@/shared";
import ArticleCard from "../article-card";
import { useNavigate } from "react-router-dom";

const ArticleList = () => {
  const { data } = useFetchArticles();
  const navigate = useNavigate();

  if (data?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-32 full-w">
        <ImFileEmpty size={180} />

        <h3 className="mt-12 text-4xl">준비된 게시글이 없습니다.</h3>
        <span className="my-5">HLOG에 기여해주세요.</span>
        <shared.Button onClick={() => navigate("/article-write")}>
          글 작성
        </shared.Button>
      </div>
    );
  }

  return (
    <>
      {data?.map((article) => (
        <ArticleCard key={article.id} {...article} />
      ))}
    </>
  );
};

export default ArticleList;
