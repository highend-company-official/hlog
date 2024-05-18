import { Suspense } from "react";

import {
  ArticleList,
  ArticleViewSelector,
  ArticleSortSelector,
} from "@/entities/article";
import * as shared from "@/shared";
import useArticle from "@/app/store/article";

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
        <ArticleViewSelector />
        <ArticleSortSelector />
      </div>
      <Suspense fallback={<Skeleton />}>
        <ArticleList viewMode={articleViewMode} />
      </Suspense>
    </div>
  );
}

export default HomePage;
