import { Divider } from "@/shared";

import { useSearchStore } from "@/entities/search";

import { ProfileSearchSection } from "@/features/search-profile";
import { ArticleSearchSection } from "@/features/search-article";

const SearchSelector = () => {
  const { query } = useSearchStore();

  if (!query.trim()) {
    return (
      <div className="w-full h-[100px] flex items-center justify-center">
        찾으시는 아티클이나 유저를 검색해보세요.
      </div>
    );
  }

  return (
    <>
      <span className="my-2 ml-3 text-lg font-semibold">검색된 아티클</span>
      <ArticleSearchSection />

      <div className="mx-10">
        <Divider />
      </div>

      {/* <span className="my-2 ml-3 text-lg font-semibold">검색된 프로필</span>
      <ProfileSearchSection /> */}
    </>
  );
};

export default SearchSelector;
