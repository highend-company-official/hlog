import { useEffect, useState } from "react";
import { useToast } from "@/app/store";
import {
  Editor,
  KeyBindingUtil,
  getDefaultKeyBinding,
  type DraftEditorCommand,
  EditorState,
} from "draft-js";
import "draft-js/dist/Draft.css";

import * as shared from "@/shared";
import useEditor from "../../hooks";
import "./index.css";

type KeyCommandType =
  | DraftEditorCommand
  | "hlog-editor-save"
  | "hlog-editor-refresh";

const EditorCore = () => {
  const { addToast } = useToast();
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const { editorState, setEditorState, saveCurrentContent, loadSavedContent } =
    useEditor();

  const customKeyBindingFunction = (e: React.KeyboardEvent) => {
    if (e.key === "s" && KeyBindingUtil.hasCommandModifier(e)) {
      return "hlog-editor-save";
    }
    if (e.key === "r" && KeyBindingUtil.hasCommandModifier(e)) {
      return "hlog-editor-refresh";
    }
    return getDefaultKeyBinding(e);
  };

  const handleKeyCommand = (command: KeyCommandType) => {
    if (command === "hlog-editor-save") {
      if (editorState.content.getCurrentContent().getPlainText() === "") {
        addToast({
          type: "warning",
          content: "저장을 위해서 내용을 입력해주세요",
          hasCloseButton: false,
          staleTime: 3000,
        });
        return "handled";
      }

      saveCurrentContent();
      addToast({
        type: "success",
        content: "내용이 저장되었습니다.",
        hasCloseButton: false,
        staleTime: 3000,
      });
      return "handled";
    }

    if (command === "hlog-editor-refresh") {
      return "handled";
    }
    return "not-handled";
  };

  const loadContentToEditor = () => {
    const loadedContent = loadSavedContent();

    if (loadedContent) {
      setEditorState({
        ...loadedContent,
        content: EditorState.createWithContent(loadedContent.content),
      });
      setIsSavedModalOpen(false);
    }
  };

  useEffect(() => {
    const loadedContent = loadSavedContent();
    if (loadedContent?.content.hasText()) {
      setIsSavedModalOpen(true);
    }
  }, []);

  return (
    <>
      <Editor
        editorState={editorState.content}
        onChange={(editorContent) =>
          setEditorState((prev) => ({ ...prev, content: editorContent }))
        }
        placeholder={shared.EDITOR_CONST.PLACEHOLDER}
        handleKeyCommand={handleKeyCommand}
        keyBindingFn={customKeyBindingFunction}
        spellCheck={false}
      />

      {isSavedModalOpen && (
        <shared.Modal>
          <shared.Modal.Header>
            이전에 작성된 글이 있습니다.
          </shared.Modal.Header>
          <shared.Modal.Content>
            해당 글을 불러오시겠습니까?
          </shared.Modal.Content>
          <shared.Modal.Footer align="right">
            <shared.Modal.Button
              type="decline"
              onClick={() => setIsSavedModalOpen(false)}
            >
              아니요
            </shared.Modal.Button>
            <div className="ml-2" />
            <shared.Modal.Button type="accept" onClick={loadContentToEditor}>
              네
            </shared.Modal.Button>
          </shared.Modal.Footer>
        </shared.Modal>
      )}
    </>
  );
};

export default EditorCore;
