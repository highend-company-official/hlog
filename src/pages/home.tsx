import { Suspense } from "react";

import { ArticleList, ArticleListSkeleton } from "@/widgets/article-list";
import { ArticleCard } from "@/widgets/article-card";
import { ArticleViewOptionToolbar } from "@/widgets/article-view-option-toolbar";

function HomePage() {
  return (
    <div className="w-full">
      <ArticleViewOptionToolbar />

      <Suspense fallback={<ArticleListSkeleton />}>
        <ArticleList cardComponent={ArticleCard} />
      </Suspense>
    </div>
  );
}

export default HomePage;
