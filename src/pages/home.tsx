import { Suspense } from "react";

import { ArticleList, ArticleListSkeleton } from "@/widgets/article-list";

import { SetArticleViewModeSelector } from "@/features/set-article-view-mode";
import { SortArticleSelector } from "@/features/sort-article";

function HomePage() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between w-full">
        <SetArticleViewModeSelector />
        <SortArticleSelector />
      </div>
      <Suspense fallback={<ArticleListSkeleton />}>
        <ArticleList />
      </Suspense>
    </div>
  );
}

export default HomePage;
