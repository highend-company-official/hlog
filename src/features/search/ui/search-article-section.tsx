import { useEffect, useState } from "react";
import { ImSpinner8 } from "react-icons/im";

import useSearchStore from "@/entities/search-input/model";
import { useDebounce } from "@/shared";

import { useGetSearchedArticles } from "../lib";
import ArticleSearchItem from "./article-search-item";

const ArticleSearchSection = () => {
  const { query } = useSearchStore();
  const debouncedQuery = useDebounce(query, 300);
  const { data, isFetching: isFetchingArticle } =
    useGetSearchedArticles(debouncedQuery);

  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setIsTyping(query.trim() ? true : false);
  }, [query]);

  useEffect(() => {
    if (!isFetchingArticle || isTyping) {
      setIsTyping(false);
    }
  }, [isFetchingArticle, isTyping]);

  const isLoading = isTyping || isFetchingArticle;

  if (isLoading) {
    return (
      <div className="w-full h-[300px] flex items-center justify-center">
        <ImSpinner8 size={24} className="animate-spin" />
      </div>
    );
  }

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
