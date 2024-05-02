import { Editor } from "draft-js";

import useEditor from "../../hooks";

const EditorCore = () => {
  const { editorState, setEditorState } = useEditor();

  return (
    <Editor
      editorState={editorState}
      onChange={setEditorState}
      placeholder="값을 입력해주세요"
    />
  );
};

export default EditorCore;
