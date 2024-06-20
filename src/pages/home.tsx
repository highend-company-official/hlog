import { HomeBanner } from "@/widgets/home-banner";
import { Header } from "@/widgets/header";
import { ArticleCard } from "@/widgets/article-card";
import { ArticleList, ArticleListSkeleton } from "@/widgets/article-list";
import { ArticleViewOptionToolbar } from "@/widgets/article-view-option-toolbar";
import { ArticleCategorySelector } from "@/features/set-article-category";
import { VerifyEmailForm } from "@/features/verify-user";
import { QueryBoundary, SEO, Skeleton } from "@/shared";
import AdsBlock from "@/shared/components/ads-block";

function HomePage() {
  return (
    <>
      <SEO
        title="HLOG | 홈"
        description="최신 기술 뉴스, 튜토리얼, 리뷰를 제공하는 Tech-Hlog입니다. 프로그래밍, 소프트웨어 개발, AI, 머신러닝, 데이터 과학 관련 정보를 확인하세요."
        url="https://tech-hlog.vercel.app"
        keywords="기술 블로그, 최신 기술 뉴스, 튜토리얼, 프로그래밍, 소프트웨어 개발, AI, 머신러닝, 데이터 과학"
      />
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

        <aside className="relative flex flex-col w-full col-span-1 px-8 pt-4 max-md:hidden">
          <div className="sticky w-full top-20">
            <QueryBoundary loadingFallback={<Skeleton height={800} />}>
              <VerifyEmailForm />
            </QueryBoundary>

            <div className="flex flex-col items-center w-full p-4 mx-auto mt-3 text-black rounded-md shadow-md">
              <AdsBlock
                client="ca-pub-3070256927583867"
                slot="6515104479"
                format="auto"
                responsive="true"
              />
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

export default HomePage;
