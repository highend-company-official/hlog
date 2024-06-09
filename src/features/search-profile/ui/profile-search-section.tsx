import { useGetSearchedProfiles, useSearchStore } from "@/entities/search";

import ProfileSearchItem from "./profile-search-item";

const ProfileSearchSection = () => {
  const { query } = useSearchStore();
  const { data } = useGetSearchedProfiles(query);

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
