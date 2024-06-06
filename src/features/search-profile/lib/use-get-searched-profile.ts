import { useQuery } from "@tanstack/react-query";

const useGetSearchedProfiles = (search: string) => {
  // const queryKey = SearchQueryKey.profileList(search);
  // const queryFn = async () => {
  //   const response = await getSearchedProfiles(search);
  //   if (response.data === null) return [];
  //   return response.data;
  // };
  // return useQuery({
  //   queryKey,
  //   queryFn,
  //   enabled: !!search.trim(),
  // });
};

export default useGetSearchedProfiles;
