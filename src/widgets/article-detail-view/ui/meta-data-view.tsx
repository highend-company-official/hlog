import { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArticleType,
  If,
  ImageDetailOverlay,
  useBucket,
  useOverlay,
  useProfile,
} from "@/shared";

import "draft-js/dist/Draft.css";
import dayjs from "dayjs";
import { PiSealCheckFill } from "react-icons/pi";

type Props = ArticleType & PropsWithChildren;

const MetaDataView = (props: Props) => {
  const navigate = useNavigate();
  const profileData = useProfile(props.profile.user_id);

  const { read: readThumbnails } = useBucket("thumbnails");
  const { open: openThumbnailOverlay } = useOverlay();

  if (!props) {
    return null;
  }

  const handleOpenThumbnailDetail = () =>
    openThumbnailOverlay(({ isOpen, exit }) => (
      <ImageDetailOverlay
        open={isOpen}
        onClose={exit}
        url={readThumbnails(props!.thumbnail)}
      />
    ));

  return (
    <>
      <img
        src={readThumbnails(props!.thumbnail)}
        alt={props.summary}
        className="object-cover col-start-3 w-full rounded-xl h-[400px] cursor-pointer shadow-md col-span-6 hover:shadow-2xl transition ease-in-out"
        onClick={handleOpenThumbnailDetail}
      />

      <section className="col-span-6 col-start-3 flex flex-col mt-5 justify-between min-h-[50px] w-full break-keep text-wrap break-words">
        <h3 className="text-5xl font-semibold text-black">{props?.title}</h3>
        <div className="flex items-center mt-6 transition ease-in-out">
          <img
            src={profileData?.profile_url}
            alt={props?.profile.username}
            className="object-cover w-10 h-10 mr-4 rounded-full cursor-pointer"
            onClick={() => navigate(`/profile/${props.profile.user_id}`)}
          />
          <span className="text-sm text-pretty">{props?.profile.username}</span>
          <If
            condition={profileData?.verified === "verified"}
            trueRender={
              <PiSealCheckFill size={20} className="ml-1 text-primary" />
            }
          />
          <span className="ml-auto text-sm text-pretty">
            발행일 : {dayjs(props.created_at).format("YYYY-MM-DD")}
          </span>
        </div>
      </section>

      <If
        condition={!!props?.summary}
        trueRender={
          <div className="w-full col-span-6 col-start-3 p-4 mt-4 text-lg break-words bg-gray-100 rounded-xl text-wrap">
            <h4 className="font-bold text-black">아티클 요약</h4>
            <span className="text-subTitle">{props?.summary}</span>
          </div>
        }
      />

      <div className="col-span-6 col-start-3">{props.children}</div>
    </>
  );
};

export default MetaDataView;
