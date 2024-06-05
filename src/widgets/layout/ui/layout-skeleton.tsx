import { Skeleton } from "@/shared";

const LayoutSkeleton = () => {
  return (
    <>
      <div className="w-full min-h-screen bg-white">
        <div className="md:w-[600px] lg:w-[800px] xl:w-[1200px] mx-auto pt-[100px]">
          <Skeleton height={1000} />
        </div>
      </div>
    </>
  );
};

export default LayoutSkeleton;
