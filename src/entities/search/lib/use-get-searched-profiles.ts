import { useSuspenseQuery } from "@tanstack/react-query";

import { getSearchedProfiles } from "../api";
import { searchKeyFactor } from "../query";

const useGetSearchedProfiles = (search: string) => {
  const queryKey = searchKeyFactor.profileSearchList(search).queryKey;
  const queryFn = async () => {
    const response = await getSearchedProfiles(search);
    return response;
  };

  return useSuspenseQuery({ queryKey, queryFn });
};

export default useGetSearchedProfiles;
