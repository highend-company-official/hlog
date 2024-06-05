import { Suspense } from "react";

import { Header } from "@/widgets/header";
import { ArticleCard } from "@/widgets/article-card";
import { ArticleList, ArticleListSkeleton } from "@/widgets/article-list";
import { ArticleViewOptionToolbar } from "@/widgets/article-view-option-toolbar";
import { HomeBanner } from "@/widgets/home-banner";

function HomePage() {
  return (
    <div className="w-full">
      {/* <Header /> */}
      <HomeBanner />

      <ArticleViewOptionToolbar />

      <Suspense fallback={<ArticleListSkeleton />}>
        <ArticleList cardComponent={ArticleCard} />
      </Suspense>
    </div>
  );
}

export default HomePage;
