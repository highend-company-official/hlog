import {
  convertFromRaw,
  convertToRaw,
  EditorState,
  RawDraftContentState,
} from "draft-js";

import * as shared from "@/shared";
import { useEditorContext } from "../lib";

type LocalStorageType = {
  title: string;
  content: RawDraftContentState;
  summary: string;
  thumbnail: string;
  hasComment: boolean;
};

const useEditor = () => {
  const editorContextValues = useEditorContext();
  const [editorLocalStorage, setEditorLocalStoage] =
    shared.useLocalStorage<LocalStorageType | null>(
      shared.STORAGE_CONSTS.HLOG_EDITOR,
      null
    );

  if (!editorContextValues) {
    throw new Error(`useEditor 훅은 EditorProvider 내부에서 사용해야 합니다.`);
  }

  const [editorState, setEditorState] = editorContextValues;

  const saveCurrentContent = () => {
    setEditorLocalStoage({
      ...editorState,
      content: convertToRaw(editorState.content.getCurrentContent()),
    });
  };

  const loadSavedContent = () => {
    if (editorLocalStorage) {
      return {
        ...editorLocalStorage,
        content: convertFromRaw(editorLocalStorage.content),
      };
    }
  };

  const resetSavedContent = () => {
    setEditorState({
      title: "",
      content: EditorState.createEmpty(),
      summary: "",
      thumbnail: "",
      hasComment: true,
    });
    setEditorLocalStoage(null);
  };

  return {
    editorState,
    setEditorState,
    saveCurrentContent,
    resetSavedContent,
    loadSavedContent,
  };
};

export default useEditor;
