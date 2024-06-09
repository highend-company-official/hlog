import { useQuery } from "@tanstack/react-query";

import { articleKeyFactor, getArticles } from "@/entities/article";

const useGetSearchedArticles = (search: string) => {
  const queryKey = articleKeyFactor.searchList(search).queryKey;
  const queryFn = async () => {
    const response = await getArticles({ search });

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
