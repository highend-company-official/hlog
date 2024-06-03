import { useNavigate, useParams } from "react-router-dom";
import { ContentBlock, convertFromRaw, EditorState } from "draft-js";

import useBucket from "@/shared/libs/useBucket";
import defaultProfile from "@/shared/assets/default-profile.jpg";
import { useGetArticleById } from "../lib";
import {
  Divider,
  If,
  ImageDetailOverlay,
  isProviderURL,
  STYLE_MAPPER,
} from "@/shared";

import "draft-js/dist/Draft.css";

import "@/shared/styles/index.css";
import "@/shared/styles/editor-style.css";

import { blockRenderFn } from "../utils/image-utils";

import EditorCore from "@/entities/hlog-editor/ui/editor-core";
import useOverlay from "@/shared/hooks/use-overlay";

type ParamsType = {
  article_id: string;
};

const ArticleView = () => {
  const navigate = useNavigate();
  const { article_id } = useParams<ParamsType>();
  const { data } = useGetArticleById(article_id!);
  const { read: readThumbnails } = useBucket("thumbnails");
  const { read: readProfiles } = useBucket("profiles");
  const { open: openThumbnailOverlay } = useOverlay();
  const { open: openArticleOverlay } = useOverlay();

  const blockStyleFn = (contentBlock: ContentBlock) => {
    const type = contentBlock.getType();

    return STYLE_MAPPER[type];
  };

  if (!data) {
    return null;
  }

  const editorState = EditorState.createWithContent(
    convertFromRaw(JSON.parse(data.body))
  );

  const handleOpenThumbnailDetail = () =>
    openThumbnailOverlay(({ isOpen, exit }) => (
      <ImageDetailOverlay
        open={isOpen}
        onClose={exit}
        url={readThumbnails(data!.thumbnail)}
      />
    ));

  const handleOpenArticleDetail = (url: string) =>
    openArticleOverlay(({ isOpen, exit }) => (
      <ImageDetailOverlay open={isOpen} onClose={exit} url={url} />
    ));

  return (
    <article>
      <img
        src={readThumbnails(data!.thumbnail)}
        alt={data.summary}
        className="object-cover w-full rounded-xl mt-9 h-96 cursor-pointer"
        onClick={handleOpenThumbnailDetail}
      />
      <section className="flex mt-5 items-center justify-between min-h-[50px] w-full break-keep text-wrap break-words">
        <h3 className="text-5xl font-bold text-gray-700">{data?.title}</h3>
        <div
          className="flex items-center p-3 transition ease-in-out rounded-lg cursor-pointer hover:bg-black/10"
          onClick={() => navigate(`/profile/${data.profile.user_id}`)}
        >
          <img
            src={
              data?.profile.profile_url
                ? isProviderURL(data?.profile.profile_url)
                  ? data?.profile.profile_url
                  : readProfiles(data?.profile.profile_url)
                : defaultProfile
            }
            alt={data?.profile.username}
            className="object-cover w-12 h-12 mr-3 rounded-full"
          />
          <span className="max-w-[180px] font-bold">
            {data?.profile.username}
          </span>
        </div>
      </section>

      <div className="my-5" />
      <Divider />

      <If
        condition={!!data?.summary}
        trueRender={
          <div className="rounded-xl p-4 mt-4 bg-gray-100 text-lg w-full text-wrap break-words">
            <h4 className="font-bold text-black">&lt;Article Summary&gt;</h4>
            <span className="text-subTitle">{data?.summary}</span>
          </div>
        }
      />

      <EditorCore
        readOnly
        editorState={editorState}
        blockRendererFn={(block) =>
          blockRenderFn(block, editorState.getCurrentContent(), {
            onClick: handleOpenArticleDetail,
          })
        }
        blockStyleFn={blockStyleFn}
        onChange={() => null}
      />
    </article>
  );
};

export default ArticleView;
