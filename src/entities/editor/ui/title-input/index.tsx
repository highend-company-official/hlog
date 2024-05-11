import { useEditorStore } from "@/app/store";

const ArticleTitleInput = () => {
  const { editorMetaData, setEditorMetaData } = useEditorStore();

  return (
    <input
      type="text"
      value={editorMetaData.title}
      onChange={(e) =>
        setEditorMetaData({ ...editorMetaData, title: e.target.value })
      }
      className="w-full mb-2 text-5xl bg-white outline-none"
      maxLength={50}
      placeholder="제목을 입력해주세요"
    />
  );
};

export default ArticleTitleInput;
