import * as shared from "@/shared";

import { useEditorStore } from "@/entities/article";

const SettingPart = () => {
  const { editorMetaData, setEditorMetaData } = useEditorStore();

  return (
    <form className="max-w-sm mx-auto">
      <div className="flex flex-col mb-5">
        <label htmlFor="summary" className="mb-2">
          아티클 요약 내용
          <span className="text-black/50">(Optional)</span>
        </label>
        <textarea
          id="summary"
          value={editorMetaData.summary}
          className="w-full p-4 text-base text-black border border-gray-300 rounded-lg resize-none bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          onChange={(event) =>
            setEditorMetaData({
              ...editorMetaData,
              summary: event.target.value,
            })
          }
        />
      </div>

      <div className="flex flex-col">
        <shared.Switch
          name="has-comment"
          label="댓글을 포함하시겠습니까?"
          checked={editorMetaData.hasComment}
          onChange={() =>
            setEditorMetaData({
              ...editorMetaData,
              hasComment: !editorMetaData.hasComment,
            })
          }
        />
        <div className="mb-4" />

        <shared.Switch
          name="has-like"
          label="좋아요를 표시하시겠습니까?"
          checked={editorMetaData.hasLike}
          onChange={() =>
            setEditorMetaData({
              ...editorMetaData,
              hasLike: !editorMetaData.hasLike,
            })
          }
        />
        <div className="mb-4" />

        <shared.Switch
          name="has-hit"
          label="방문자 수를 표시하시겠습니까?"
          checked={editorMetaData.hasHit}
          onChange={() =>
            setEditorMetaData({
              ...editorMetaData,
              hasHit: !editorMetaData.hasHit,
            })
          }
        />
        <div className="mb-4" />
      </div>

      <shared.Blockquote>
        <span>
          설정에 실수가 있어도 걱정하지 마세요. <br />
          <strong className="font-bold">추후에 수정할 수 있습니다.</strong>
        </span>
      </shared.Blockquote>
    </form>
  );
};

export default SettingPart;
