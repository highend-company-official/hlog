import { Skeleton } from "@/shared";

const MetaDataViewSkeleton = () => {
  return (
    <div className="grid content-center grid-cols-10 pt-24 mx-8">
      <div className="col-span-6 col-start-3">
        <Skeleton.Image />
        <div className="mt-10" />

        <Skeleton height={100} />
        <div className="mt-10" />

        <Skeleton.Text repeat={20} />
      </div>
    </div>
  );
};

export default MetaDataViewSkeleton;
