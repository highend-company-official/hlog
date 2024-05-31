import { useQuery } from "@tanstack/react-query";

import { QUERY_CONSTS } from "@/shared";

import { getSearchedProfiles } from "../api";

const useGetSearchedProfiles = (search: string) => {
  const queryKey = useGetSearchedProfiles.pk(search);
  const queryFn = async () => {
    const response = await getSearchedProfiles(search);

    if (response.data === null) return [];

    return response.data;
  };

  return useQuery({
    queryKey,
    queryFn,
    enabled: !!search.trim(),
  });
};

useGetSearchedProfiles.pk = (search: string) => [
  QUERY_CONSTS.SEARCH,
  QUERY_CONSTS.USER,
  search,
];

export default useGetSearchedProfiles;
