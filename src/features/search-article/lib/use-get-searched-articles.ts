import { useQuery } from "@tanstack/react-query";

import { SearchQueryKey, getSearchedArticles } from "@/entities/search";

const useGetSearchedArticles = (search: string) => {
  const queryKey = SearchQueryKey.articleList(search);
  const queryFn = async () => {
    const response = await getSearchedArticles(search);

    if (response.data === null) return [];

    return response.data;
  };

  return useQuery({
    queryKey,
    queryFn,
    enabled: !!search.trim(),
  });
};

export default useGetSearchedArticles;
