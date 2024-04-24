import { GiVacuumCleaner } from "react-icons/gi";

import { useFetchArticles } from "../../lib";
import ArticleCard from "../article-card";

const ArticleList = () => {
  const { data } = useFetchArticles();

  if (data?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-32 full-w">
        <GiVacuumCleaner size={180} />

        <h3 className="mt-12 text-4xl">준비된 게시글이 없습니다.</h3>
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
