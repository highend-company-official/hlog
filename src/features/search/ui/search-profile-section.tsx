import useSearchStore from "@/entities/search-input/model";

import { ProfileSearchItem } from ".";
import { useGetSearchedProfiles } from "../lib";
import { useDebounce } from "@/shared";

const ProfileSearchSection = () => {
  const { query } = useSearchStore();
  const debouncedQuery = useDebounce(query, 300);
  const { data } = useGetSearchedProfiles(debouncedQuery);

  if (data?.length === 0) {
    return (
      <div className="flex items-center justify-center w-full p-6">
        검색된 프로필이 없습니다.
      </div>
    );
  }

  const searchedArticleMap =
    data?.map((searchData) => (
      <ProfileSearchItem key={searchData.id} {...searchData} />
    )) ?? [];

  return <>{searchedArticleMap}</>;
};

export default ProfileSearchSection;
