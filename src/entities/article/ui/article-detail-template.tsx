import { useNavigate } from "react-router-dom";

import {
  ArticleType,
  Divider,
  If,
  ImageDetailOverlay,
  isProviderURL,
  useBucket,
  useOverlay,
} from "@/shared";
import defaultProfile from "@/shared/assets/default-profile.jpg";

import "draft-js/dist/Draft.css";
import { PropsWithChildren } from "react";

type Props = ArticleType & PropsWithChildren;

const ArticleDetailTemplate = (props: Props) => {
  const navigate = useNavigate();

  const { read: readThumbnails } = useBucket("thumbnails");
  const { read: readProfiles } = useBucket("profiles");
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
    <article>
      <img
        src={readThumbnails(props!.thumbnail)}
        alt={props.summary}
        className="object-cover w-full rounded-xl mt-9 h-96 cursor-pointer"
        onClick={handleOpenThumbnailDetail}
      />
      <section className="flex mt-5 items-center justify-between min-h-[50px] w-full break-keep text-wrap break-words">
        <h3 className="text-5xl font-bold text-gray-700">{props?.title}</h3>
        <div
          className="flex items-center p-3 transition ease-in-out rounded-lg cursor-pointer hover:bg-black/10"
          onClick={() => navigate(`/profile/${props.profile.user_id}`)}
        >
          <img
            src={
              props?.profile.profile_url
                ? isProviderURL(props?.profile.profile_url)
                  ? props?.profile.profile_url
                  : readProfiles(props?.profile.profile_url)
                : defaultProfile
            }
            alt={props?.profile.username}
            className="object-cover w-12 h-12 mr-3 rounded-full"
          />
          <span className="max-w-[180px] font-bold">
            {props?.profile.username}
          </span>
        </div>
      </section>

      <div className="my-5" />
      <Divider />

      <If
        condition={!!props?.summary}
        trueRender={
          <div className="rounded-xl p-4 mt-4 bg-gray-100 text-lg w-full text-wrap break-words">
            <h4 className="font-bold text-black">&lt;Article Summary&gt;</h4>
            <span className="text-subTitle">{props?.summary}</span>
          </div>
        }
      />

      {props.children}
    </article>
  );
};

export default ArticleDetailTemplate;
