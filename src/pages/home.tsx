import { Suspense } from "react";

import { HomeBanner } from "@/widgets/home-banner";
import { Header } from "@/widgets/header";
import { ArticleCard } from "@/widgets/article-card";
import { ArticleList, ArticleListSkeleton } from "@/widgets/article-list";
import { ArticleViewOptionToolbar } from "@/widgets/article-view-option-toolbar";
import { ArticleCategorySelector } from "@/features/set-article-category";
import { VerifyEmailForm } from "@/features/verify-user";

function HomePage() {
  return (
    <>
      <Header />
      <HomeBanner />

      <div className="grid grid-cols-4 w-full">
        <aside className="relative col-span-1 p-4">
          <ArticleCategorySelector />
        </aside>

        <main className="col-span-2 col-start-2 mt-4 w-full mx-auto">
          <ArticleViewOptionToolbar />

          <Suspense fallback={<ArticleListSkeleton />}>
            <ArticleList cardComponent={ArticleCard} />
          </Suspense>
        </main>

        <aside className="relative col-span-1 pt-4 px-8">
          <VerifyEmailForm />
        </aside>
      </div>
    </>
  );
}

export default HomePage;
