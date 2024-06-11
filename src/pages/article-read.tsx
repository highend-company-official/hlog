import { Header } from "@/widgets/header";
import {
  ArticleDetailViewContainer,
  ArticleDetailViewSkeleton,
} from "@/widgets/article-detail-view";
import { QueryBoundary, useMount, useScrollToTop } from "@/shared";

function ArticleRead() {
  const { scrollToTop } = useScrollToTop();

  useMount(() => {
    scrollToTop();
  });

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
