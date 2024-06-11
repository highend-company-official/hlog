import bannerVideo from "@/shared/assets/banner-video.mp4";

const HomeBanner = () => {
  return (
    <section className="relative col-span-4 w-full bg-black h-[400px] overflow-hidden max-md:hidden">
      <video className="w-full h-full object-cover" autoPlay loop muted>
        <source src={bannerVideo} type="video/mp4" />
      </video>

      <div className="absolute top-0 left-0 backdrop-blur-sm bg-black/30 w-full h-full flex items-center justify-center">
        <h2 className="mt-206 text-6xl text-white font-bold">
          "New tech blog, start here."
        </h2>
      </div>
    </section>
  );
};

export default HomeBanner;
