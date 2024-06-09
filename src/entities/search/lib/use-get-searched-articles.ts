import { useSuspenseQuery } from "@tanstack/react-query";

import { getSearchedArticles } from "../api";
import { searchKeyFactor } from "../query";

const useGetSearchedArticles = (search: string) => {
  const queryKey = searchKeyFactor.articleSearchList(search).queryKey;
  const queryFn = async () => {
    const response = await getSearchedArticles(search);
    return response;
  };

  return useSuspenseQuery({ queryKey, queryFn });
};

export default useGetSearchedArticles;
