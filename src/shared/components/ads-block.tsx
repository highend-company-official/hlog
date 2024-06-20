import { useEffect } from "react";

type Props = {
  className?: string;
  client: string;
  slot: string;
  format: string;
  responsive: string;
};

const AdsBlock = ({ className, client, slot, format, responsive }: Props) => {
  useEffect(() => {
    if (process.env.NODE_ENV === "production")
      try {
        //@ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        console.log("Advertise is pushed");
      } catch (e) {
        console.error("AdvertiseError", e);
      }
  }, []);

  //production이 아닌 경우 대체 컴포넌트 표시
  if (process.env.NODE_ENV !== "production")
    return <div>로컬 환경에서는 광고를 표시할 수 없습니다.</div>;

  return (
    <ins
      className={className}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive}
    />
  );
};

export default AdsBlock;
