import { lazy } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ContentBlock, convertFromRaw, EditorState } from "draft-js";

import useBucket from "@/shared/libs/useBucket";
import defaultProfile from "@/shared/assets/default-profile.jpg";
import { useGetArticleById } from "../lib";
import { Divider, If, isProviderURL, STYLE_MAPPER } from "@/shared";

import "draft-js/dist/Draft.css";

import "@/shared/styles/index.css";
import "@/shared/styles/editor-style.css";
import { blockRenderFn } from "../utils/image-utils";
import useArticleStore from "../model";
import ImageDetailOverlay from "./image-detail-overlay";

const Editor = lazy(() =>
  import("draft-js").then((module) => ({ default: module.Editor }))
);

type ParamsType = {
  article_id: string;
};

const ArticleView = () => {
  const navigate = useNavigate();
  const { article_id } = useParams<ParamsType>();
  const { data } = useGetArticleById(article_id!);
  const { read: readThumbnails } = useBucket("thumbnails");
  const { read: readProfiles } = useBucket("profiles");
  const { open } = useArticleStore();

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

  return (
    <article>
      <img
        src={readThumbnails(data!.thumbnail)}
        alt={data.summary}
        className="object-cover w-full rounded-xl mt-9 h-96"
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

      <div id="hlog" className="read-only">
        <Editor
          readOnly
          editorState={editorState}
          blockRendererFn={(block) =>
            blockRenderFn(block, editorState.getCurrentContent())
          }
          blockStyleFn={blockStyleFn}
          onChange={() => null}
        />
      </div>

      {open.isImageDetailOverlayOpen && <ImageDetailOverlay />}
    </article>
  );
};

export default ArticleView;
