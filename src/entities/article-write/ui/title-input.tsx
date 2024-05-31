import useEditorStore from "@/entities/article-write/model";

const ArticleTitleInput = () => {
  const { editorMetaData, setEditorMetaData } = useEditorStore();

  return (
    <input
      type="text"
      value={editorMetaData.title}
      onChange={(e) =>
        setEditorMetaData({ ...editorMetaData, title: e.target.value })
      }
      className="w-full mb-2 text-5xl bg-white outline-none focus:placeholder:text-black/50 font-bold text-black"
      maxLength={40}
      placeholder="제목을 입력해주세요"
    />
  );
};

export default ArticleTitleInput;
