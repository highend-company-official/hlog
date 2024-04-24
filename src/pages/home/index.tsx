import { Suspense } from "react";

import * as shared from "@/shared";

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
  return (
    <div className="w-full">
      <Suspense fallback={<Skeleton />}>
        <Skeleton />
      </Suspense>
    </div>
  );
}

export default HomePage;
