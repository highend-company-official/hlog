import { Skeleton } from "@/shared";

const ArticleListSkeleton = () => {
  return (
    <>
      <div className="mt-8" />
      <Skeleton height={340} />
      <div className="mb-4" />
      <Skeleton height={340} />
      <div className="mb-4" />
      <Skeleton height={340} />
      <div className="mb-4" />
      <Skeleton height={340} />
      <div className="mb-4" />
      <Skeleton height={340} />
    </>
  );
};

export default ArticleListSkeleton;
