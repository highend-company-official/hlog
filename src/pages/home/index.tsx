import { Suspense } from "react";

import { ArticleList, ArticleViewSelector } from "@/entities/article";
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
      <ArticleViewSelector />
      <Suspense fallback={<Skeleton />}>
        <ArticleList viewMode={articleViewMode} />
      </Suspense>
    </div>
  );
}

export default HomePage;
