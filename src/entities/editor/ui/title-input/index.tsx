import useEditor from "../../hooks";

const ArticleTitleInput = () => {
  const { editorState, setEditorState } = useEditor();

  return (
    <input
      type="text"
      value={editorState.title}
      onChange={(e) =>
        setEditorState((prev) => ({ ...prev, title: e.target.value }))
      }
      className="w-full mb-2 text-5xl bg-white outline-none"
      maxLength={50}
      placeholder="제목을 입력해주세요"
    />
  );
};

export default ArticleTitleInput;
