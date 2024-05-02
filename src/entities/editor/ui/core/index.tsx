import { useToast } from "@/app/store";
import {
  Editor,
  KeyBindingUtil,
  getDefaultKeyBinding,
  type DraftEditorCommand,
} from "draft-js";
import "draft-js/dist/Draft.css";

import useEditor from "../../hooks";

type KeyCommandType = DraftEditorCommand | "hlog-editor-save";

const EditorCore = () => {
  const { editorState, setEditorState, saveCurrentContent } = useEditor();
  const { addToast } = useToast();

  const customKeyBindingFunction = (e: React.KeyboardEvent) => {
    if (e.key === "s" && KeyBindingUtil.hasCommandModifier(e)) {
      return "hlog-editor-save";
    }
    return getDefaultKeyBinding(e);
  };

  const handleKeyCommand = (command: KeyCommandType) => {
    if (command === "hlog-editor-save") {
      saveCurrentContent();
      addToast({
        type: "success",
        content: "내용이 저장되었습니다.",
        hasCloseButton: false,
        staleTime: 3000,
      });
      return "handled";
    }
    return "not-handled";
  };

  return (
    <Editor
      editorState={editorState}
      onChange={setEditorState}
      placeholder="값을 입력해주세요"
      handleKeyCommand={handleKeyCommand}
      keyBindingFn={customKeyBindingFunction}
      spellCheck={false}
    />
  );
};

export default EditorCore;
