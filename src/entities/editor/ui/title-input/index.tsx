import useEditorStore from "@/entities/editor/model";

const ArticleTitleInput = () => {
  const { editorMetaData, setEditorMetaData } = useEditorStore();

  return (
    <input
      type="text"
      value={editorMetaData.title}
      onChange={(e) =>
        setEditorMetaData({ ...editorMetaData, title: e.target.value })
      }
      className="w-full mb-2 text-5xl bg-white outline-none focus:placeholder:text-[#bdc1c9]"
      maxLength={50}
      placeholder="제목을 입력해주세요"
    />
  );
};

export default ArticleTitleInput;
