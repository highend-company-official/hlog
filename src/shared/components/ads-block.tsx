import { useEffect } from "react";

type Props = {
  client: string;
  slot: string;
  format: string;
  responsive: string;
};

const AdsBlock = ({ client, slot, format, responsive }: Props) => {
  useEffect(() => {
    const pushAd = () => {
      try {
        //@ts-ignore
        const adsbygoogle = window.adsbygoogle;
        // console.log({ adsbygoogle })
        adsbygoogle.push({});
      } catch (e) {
        console.error(e);
      }
    };

    const interval = setInterval(() => {
      //@ts-ignore
      if (window.adsbygoogle) {
        pushAd();
        clearInterval(interval);
      }
    }, 300);

    return () => {
      clearInterval(interval);
    };
  }, []);

  //production이 아닌 경우 대체 컴포넌트 표시
  if (process.env.NODE_ENV !== "production")
    return <div>로컬 환경에서는 광고를 표시할 수 없습니다.</div>;

  return (
    <ins
      style={{
        display: "block",
      }}
      className="adsbygoogle"
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive}
    />
  );
};

export default AdsBlock;
