import { Suspense } from "react";

import * as shared from "@/shared";
import { ArticleList } from "@/entities/article";

const Skeleton = () => {
  return (
    <>
      <shared.Skeleton height={15} />
      <shared.Skeleton height={15} />
      <shared.Skeleton height={15} />
      <shared.Skeleton height={15} />
      <shared.Skeleton height={15} />
    </>
  );
};

function HomePage() {
  return (
    <div className="w-full">
      <Suspense fallback={<Skeleton />}>
        <ArticleList />
      </Suspense>
    </div>
  );
}

export default HomePage;
