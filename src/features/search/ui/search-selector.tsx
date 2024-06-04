import useSearchStore from "@/entities/search-input/model";
import { Divider } from "@/shared";

import ArticleSearchSection from "./search-article-section";
import ProfileSearchSection from "./search-profile-section";

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

      <span className="my-2 ml-3 text-lg font-semibold">검색된 프로필</span>
      <ProfileSearchSection />
    </>
  );
};

export default SearchSelector;
