import { useSuspenseQuery } from "@tanstack/react-query";

import { getArticles } from "../api";
import { ArticleFilterType, articleKeyFactor } from "../query";

const useGetArticles = (filterType: ArticleFilterType) => {
  const queryKey = articleKeyFactor.list(filterType).queryKey;
  const queryFn = async () => {
    const response = await getArticles(filterType);
    return response;
  };

  return useSuspenseQuery({ queryKey, queryFn });
};

export default useGetArticles;
