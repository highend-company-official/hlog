import { Suspense } from "react";

import { ArticleList } from "@/entities/article";

function HomePage() {
  return (
    <div className="w-full">
      <Suspense fallback={<>Loading...</>}>
        <ArticleList />
      </Suspense>
    </div>
  );
}

export default HomePage;
