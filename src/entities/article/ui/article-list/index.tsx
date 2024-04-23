import { useFetchArticles } from "../../lib";
import ArticleCard from "../article-card";

const ArticleList = () => {
  const { data } = useFetchArticles();

  if (!data) {
    return null;
  }

  return (
    <>
      {data.map((article) => (
        <ArticleCard key={article.id} {...article} />
      ))}
    </>
  );
};

export default ArticleList;
