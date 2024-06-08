import { Header } from "@/widgets/header";
import {
  ArticleDetailViewContainer,
  ArticleDetailViewSkeleton,
} from "@/widgets/article-detail-view";
import { QueryBoundary } from "@/shared";

function ArticleRead() {
  return (
    <>
      <Header />

      <QueryBoundary loadingFallback={<ArticleDetailViewSkeleton />}>
        <ArticleDetailViewContainer />
      </QueryBoundary>
    </>
  );
}

export default ArticleRead;
