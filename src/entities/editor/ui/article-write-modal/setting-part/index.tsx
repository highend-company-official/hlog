import { useEditorStore } from "@/app/store";
import React, { useState } from "react";
import * as shared from "@/shared";

type SettingState = {
  thumbnail: File | null;
  summary: string;
  hasComment: boolean;
};

const SettingPart = () => {
  // const navigate = useNavigate();
  const {
    editorMetaData: { title },
  } = useEditorStore();
  // const { resetSavedContent } = useEditorUtils();
  // const { addToast } = useToastStore();

  const [setting, setSetting] = useState<SettingState>({
    thumbnail: null,
    summary: "",
    hasComment: true,
  });

  const handleChangeFileInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const thumbnail = event.currentTarget.files?.[0];
    if (thumbnail) {
      setSetting((prev) => ({ ...prev, thumbnail }));
    }
  };

  // const handleUploadThumbnail = async () => {
  //   if (setting.thumbnail) {
  //     const { data } = await supabase.storage
  //       .from("thumbnails")
  //       .upload(`${generateRandomId()}`, setting.thumbnail, {
  //         cacheControl: "3600",
  //         upsert: false,
  //       });

  //     return data;
  //   }
  // };

  // const createContentToHTML = (content: ContentState) => {
  //   const html = convertToHTML({
  //     blockToHTML: (block) => {
  //       if (block.type === "blockquote") {
  //         return <blockquote className="hlog_blockquote" />;
  //       }
  //       return null;
  //     },
  //   })(content);

  //   return html;
  // };

  // const handleUploadArticle = async (thumbnailUrl: string) => {
  //   const response = await supabase
  //     .from("articles")
  //     .insert({
  //       title,
  //       body: createContentToHTML(content.getCurrentContent()),
  //       summary,
  //       thumbnail: thumbnailUrl,
  //       has_comments: hasComment,
  //     })
  //     .select("id");

  //   addToast({
  //     type: "success",
  //     content: "아티클 발행에 성공하였습니다.",
  //     hasCloseButton: true,
  //     staleTime: 3000,
  //   });

  //   resetSavedContent();
  //   const createdArticleId = response.data?.[0].id;
  //   navigate(`/article-read/${createdArticleId}`, { replace: true });
  // };

  return (
    <form className="max-w-sm mx-auto">
      <div className="flex flex-col mb-4">
        <label htmlFor="thumbnail" className="mb-2 font-bold">
          아티클 썸네일
          <span className="text-red-500"> *Required</span>
        </label>

        <shared.If
          condition={setting.thumbnail == null}
          trueRender={
            <div className="flex items-center justify-center w-full h-64 bg-black/10 rounded-3xl">
              썸네일을 등록해주세요.
            </div>
          }
          falseRender={
            <img
              // src={URL.createObjectURL(setting.thumbnail)}
              alt={title}
              className="object-cover w-full h-64 max-md:w-0 rounded-3xl"
            />
          }
        />
      </div>

      <input
        type="file"
        hidden
        multiple={false}
        accept="image/*"
        onChange={handleChangeFileInput}
      />

      <div className="flex flex-col mb-5">
        <label htmlFor="summary" className="mb-2">
          아티클 요약 내용
          <span className="text-black/50">(Optional)</span>
        </label>
        <textarea
          id="summary"
          value={setting.summary}
          className="w-full p-4 text-base text-gray-900 border border-gray-300 rounded-lg resize-none bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          onChange={(event) =>
            setSetting((prev) => ({
              ...prev,
              summary: event.target.value,
            }))
          }
        />
      </div>

      <div className="flex flex-col h-20 mb-5">
        <shared.Switch
          label="댓글을 포함하시겠습니까?"
          checked={setting.hasComment}
          onChange={() =>
            setSetting((prev) => ({
              ...prev,
              hasComment: !prev.hasComment,
            }))
          }
        />
      </div>
    </form>
  );
};

export default SettingPart;
