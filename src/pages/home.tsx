import { HomeBanner } from "@/widgets/home-banner";
import { Header } from "@/widgets/header";
import { ArticleCard } from "@/widgets/article-card";
import { ArticleList, ArticleListSkeleton } from "@/widgets/article-list";
import { ArticleViewOptionToolbar } from "@/widgets/article-view-option-toolbar";
import { ArticleCategorySelector } from "@/features/set-article-category";
import { VerifyEmailForm } from "@/features/verify-user";
import { QueryBoundary, Skeleton } from "@/shared";

function HomePage() {
  return (
    <>
      <Header />
      <HomeBanner />

      <div className="grid w-full grid-cols-4 max-md:pt-14">
        <aside className="relative col-span-1 p-4 max-md:hidden">
          <QueryBoundary loadingFallback={<Skeleton height={800} />}>
            <ArticleCategorySelector />
          </QueryBoundary>
        </aside>

        <main className="w-full col-span-2 col-start-2 mx-auto mt-4 max-md:col-span-4 max-md:px-4">
          <ArticleViewOptionToolbar />

          <QueryBoundary loadingFallback={<ArticleListSkeleton />}>
            <ArticleList cardComponent={ArticleCard} />
          </QueryBoundary>
        </main>

        <aside className="relative col-span-1 px-8 pt-4 max-md:hidden">
          <QueryBoundary loadingFallback={<Skeleton height={800} />}>
            <VerifyEmailForm />
          </QueryBoundary>
        </aside>
      </div>
    </>
  );
}

export default HomePage;
