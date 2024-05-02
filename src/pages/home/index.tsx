import { Suspense, useEffect } from "react";

import { ArticleList } from "@/entities/article";
import * as shared from "@/shared";
import { useModal } from "@/app/store";

const Skeleton = () => {
  return (
    <>
      <shared.Skeleton height={340} />
      <shared.Skeleton height={340} />
      <shared.Skeleton height={340} />
      <shared.Skeleton height={340} />
      <shared.Skeleton height={340} />
    </>
  );
};

function HomePage() {
  const { modals, addModal } = useModal();

  useEffect(() => {
    addModal({
      title: "Hello",
      content: "world",
    });
  }, []);

  return (
    <div className="w-full">
      <Suspense fallback={<Skeleton />}>
        <ArticleList />
      </Suspense>
    </div>
  );
}

export default HomePage;
