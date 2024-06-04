import { Suspense } from "react";

import {
  SetArticleViewSelector,
  SortArticleSelector,
} from "@/features/article-read/ui";
import { ArticleList } from "@/entities/article-read";
import useArticleStore from "@/entities/article-read/model";
import * as shared from "@/shared";

const Skeleton = () => {
  return (
    <>
      <div className="mt-8" />
      <shared.Skeleton height={340} />
      <div className="mb-4" />
      <shared.Skeleton height={340} />
      <div className="mb-4" />
      <shared.Skeleton height={340} />
      <div className="mb-4" />
      <shared.Skeleton height={340} />
      <div className="mb-4" />
      <shared.Skeleton height={340} />
    </>
  );
};

function HomePage() {
  const { articleViewMode } = useArticleStore();

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
