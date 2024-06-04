import { useEffect, useState } from "react";
import { ImSpinner8 } from "react-icons/im";

import useSearchStore from "@/entities/search-input/model";
import { useDebounce } from "@/shared";

import { useGetSearchedProfiles } from "../lib";
import { ProfileSearchItem } from ".";

const ProfileSearchSection = () => {
  const { query } = useSearchStore();
  const debouncedQuery = useDebounce(query, 300);
  const { data, isFetching: isFetchingProfile } =
    useGetSearchedProfiles(debouncedQuery);

  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setIsTyping(query.trim() ? true : false);
  }, [query]);

  useEffect(() => {
    if (!isFetchingProfile || isTyping) {
      setIsTyping(false);
    }
  }, [isFetchingProfile, isTyping]);

  const isLoading = isTyping || isFetchingProfile;

  if (isLoading) {
    return (
      <div className="w-full h-[300px] flex items-center justify-center">
        <ImSpinner8 size={24} className="animate-spin" />
      </div>
    );
  }

  if (!isFetchingProfile && data?.length === 0) {
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
