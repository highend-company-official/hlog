import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  RawDraftContentState,
} from "draft-js";

import * as shared from "@/shared";
import { useEditorContext } from "../lib";

const useEditor = () => {
  const editorContextValues = useEditorContext();
  const [editorLocalStorage, setEditorLocalStoage] =
    shared.useLocalStorage<RawDraftContentState | null>(
      shared.STORAGE_CONSTS.HLOG_EDITOR,
      null
    );

  if (!editorContextValues) {
    throw new Error(`useEditor 훅은 EditorProvider 내부에서 사용해야 합니다.`);
  }

  const [editorState, setEditorState] = editorContextValues;

  const saveCurrentContent = () => {
    const currentContent = editorState.getCurrentContent();
    const raws = convertToRaw(currentContent);
    setEditorLocalStoage(raws);
  };

  const loadSavedContent = () => {
    if (editorLocalStorage) {
      const content = convertFromRaw(editorLocalStorage);
      const loadedEditorState = EditorState.createWithContent(content);
      setEditorState(loadedEditorState);
    }
  };

  return {
    editorState,
    setEditorState,
    saveCurrentContent,
    loadSavedContent,
  };
};

export default useEditor;
