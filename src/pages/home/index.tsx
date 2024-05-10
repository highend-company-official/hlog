import { Suspense } from "react";

import { ArticleList, ArticleViewSelector } from "@/entities/article";
import * as shared from "@/shared";

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
  return (
    <div className="w-full">
      <ArticleViewSelector />
      <Suspense fallback={<Skeleton />}>
        <ArticleList />
      </Suspense>
    </div>
  );
}

export default HomePage;
