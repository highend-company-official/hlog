import { ArticleList } from "@/entities/article";
import { Suspense } from "react";

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
