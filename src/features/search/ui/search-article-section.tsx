import useSearchStore from "@/entities/search-input/model";
import { useDebounce } from "@/shared";
import { useGetSearchedArticles } from "../lib";
import ArticleSearchItem from "./article-search-item";

const ArticleSearchSection = () => {
  const { query } = useSearchStore();
  const debouncedQuery = useDebounce(query, 300);
  const { data } = useGetSearchedArticles(debouncedQuery);

  if (data?.length === 0) {
    return (
      <div className="flex items-center justify-center w-full p-6">
        검색된 아티클이 없습니다.
      </div>
    );
  }

  const searchedArticleMap =
    data?.map((searchData) => (
      <ArticleSearchItem key={searchData.id} {...searchData} />
    )) ?? [];

  return <>{searchedArticleMap}</>;
};

export default ArticleSearchSection;
