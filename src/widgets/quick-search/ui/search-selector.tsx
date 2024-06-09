import { If, QueryBoundary, Skeleton } from "@/shared";

import { useSearchStore } from "@/entities/search";

import { ProfileSearchSection } from "@/features/search-profile";
import { ArticleSearchSection } from "@/features/search-article";
import { ImSpinner8 } from "react-icons/im";

const SearchSelector = () => {
  const { query, mode } = useSearchStore();

  if (!query.trim()) {
    return (
      <div className="w-full h-[100px] flex items-center justify-center">
        위 검색창에 찾으시는 {mode === "article" ? "아티클" : "프로필"}을
        검색해보세요.
      </div>
    );
  }

  return (
    <QueryBoundary
      loadingFallback={
        <div className="w-full h-[300px] flex items-center justify-center">
          <ImSpinner8 size={24} className="animate-spin" />
        </div>
      }
    >
      <If
        condition={mode === "article"}
        trueRender={
          <>
            <span className="my-2 ml-3 text-lg font-semibold">
              검색된 아티클
            </span>
            <ArticleSearchSection />
          </>
        }
      />

      <If
        condition={mode === "profile"}
        trueRender={
          <>
            <span className="my-2 ml-3 text-lg font-semibold">
              검색된 프로필
            </span>
            <ProfileSearchSection />
          </>
        }
      />
    </QueryBoundary>
  );
};

export default SearchSelector;
