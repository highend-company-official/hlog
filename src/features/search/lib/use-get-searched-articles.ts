import { QUERY_CONSTS } from "@/shared";
import { useQuery } from "@tanstack/react-query";
import { getSearchedArtiles } from "../api";

const useGetSearchedArticles = (search: string) => {
  const queryKey = useGetSearchedArticles.pk(search);
  const queryFn = async () => {
    const response = await getSearchedArtiles(search);

    if (response.data === null) return [];

    return response.data;
  };

  return useQuery({
    queryKey,
    queryFn,
    enabled: !!search.trim(),
  });
};

useGetSearchedArticles.pk = (search: string) => [
  QUERY_CONSTS.SEARCH,
  QUERY_CONSTS.ARTICLE,
  search,
];

export default useGetSearchedArticles;
