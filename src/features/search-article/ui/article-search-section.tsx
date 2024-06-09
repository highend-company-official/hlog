import { useGetSearchedArticles, useSearchStore } from "@/entities/search";

import ArticleSearchItem from "./article-search-item";

const ArticleSearchSection = () => {
  const { query } = useSearchStore();
  const { data, isFetching: isFetchingArticle } = useGetSearchedArticles(query);

  if (!isFetchingArticle && data?.length === 0) {
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
