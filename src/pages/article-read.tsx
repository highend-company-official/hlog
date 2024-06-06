import { Header } from "@/widgets/header";
import { ArticleDetailViewContainer } from "@/widgets/article-detail-view";
import { Suspense } from "react";
import MetaDataViewSkeleton from "@/widgets/article-detail-view/ui/article-detail-view-skeleton";

function ArticleRead() {
  return (
    <>
      <Header />

      <Suspense fallback={<MetaDataViewSkeleton />}>
        <ArticleDetailViewContainer />
      </Suspense>
    </>
  );
}

export default ArticleRead;
