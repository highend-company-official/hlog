import { Suspense } from "react";

import { ArticleList } from "@/entities/article";
import * as shared from "@/shared";
import useArticle from "@/app/store/article";

import { SetArticleViewSelector } from "@/features/article/set-article-view-selector";
import { SortArticleSelector } from "@/features/article/sort-article-selector";

const Skeleton = () => {
  return (
    <>
      <shared.Skeleton height={340} />
      <shared.Skeleton height={340} />
      <shared.Skeleton height={340} />
      <shared.Skeleton height={340} />
      <shared.Skeleton height={340} />
    </>
  );
};

function HomePage() {
  const { articleViewMode } = useArticle();

  return (
    <div className="w-full">
      <div className="flex items-center justify-between w-full">
        <SetArticleViewSelector />
        <SortArticleSelector />
      </div>
      <Suspense fallback={<Skeleton />}>
        <ArticleList viewMode={articleViewMode} />
      </Suspense>
    </div>
  );
}

export default HomePage;
