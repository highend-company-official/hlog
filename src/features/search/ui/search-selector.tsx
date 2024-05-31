import { Suspense } from "react";
import { ImSpinner8 } from "react-icons/im";

import { Divider } from "@/shared";

import useSearchStore from "@/entities/search-input/model";

import { useGetSearchedArticles, useGetSearchedProfiles } from "../lib";

import ArticleSearchItem from "./article-search-item";
import ProfileSearchItem from "./profile-search-item";

const ArticleSearchSection = () => {
  const { searchInput } = useSearchStore();
  const { data } = useGetSearchedArticles(searchInput);

  if (data?.length === 0) {
    return (
      <div className="flex items-center justify-center w-full p-6">
        검색된 아티클이 없습니다.
      </div>
    );
  }

  const searchedArticleMap =
    data?.map((searchData) => (
      <ArticleSearchItem key={searchData.id} {...searchData} />
    )) ?? [];

  return <>{searchedArticleMap}</>;
};

const ProfileSearchSection = () => {
  const { searchInput } = useSearchStore();
  const { data } = useGetSearchedProfiles(searchInput);

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

const SearchSelector = () => {
  const { searchInput } = useSearchStore();

  if (!searchInput.trim()) {
    return (
      <div className="w-full h-[100px] flex items-center justify-center">
        찾으시는 아티클이나 유저를 검색해보세요.
      </div>
    );
  }

  return (
    <>
      <span className="my-2 ml-3 text-lg font-semibold">검색된 아티클</span>

      <Suspense
        fallback={
          <div className="w-full h-[300px] flex items-center justify-center">
            <ImSpinner8 size={24} className="animate-spin" />
          </div>
        }
      >
        <ArticleSearchSection />
      </Suspense>

      <div className="mx-10">
        <Divider />
      </div>

      <span className="my-2 ml-3 text-lg font-semibold">검색된 프로필</span>
      <Suspense
        fallback={
          <div className="w-full h-[300px] flex items-center justify-center">
            <ImSpinner8 size={24} className="animate-spin" />
          </div>
        }
      >
        <ProfileSearchSection />
      </Suspense>
    </>
  );
};

export default SearchSelector;
