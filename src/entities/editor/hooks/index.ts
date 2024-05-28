import {
  convertFromRaw,
  convertToRaw,
  EditorState,
  RawDraftContentState,
} from "draft-js";

import * as shared from "@/shared";
import { useCallback } from "react";
import useEditorStore from "@/entities/editor/model";

type LocalStorageType = {
  title: string;
  content: RawDraftContentState;
  summary: string;
  thumbnail: File | null;
  hasComment: boolean;
  hasLike: boolean;
  hasHit: boolean;
};

const useEditorUtils = () => {
  const { editorMetaData, setEditorMetaData } = useEditorStore();
  const [editorLocalStorage, setEditorLocalStoage] =
    shared.useLocalStorage<LocalStorageType | null>(
      shared.STORAGE_CONSTS.HLOG_EDITOR,
      null
    );

  const saveCurrentContent = useCallback(() => {
    setEditorLocalStoage({
      ...editorMetaData,
      content: convertToRaw(editorMetaData.content.getCurrentContent()),
    });
  }, [editorMetaData, setEditorLocalStoage]);

  const loadSavedContent = useCallback(() => {
    if (editorLocalStorage) {
      return {
        ...editorLocalStorage,
        content: convertFromRaw(editorLocalStorage.content),
      };
    }
  }, [editorLocalStorage]);

  const resetSavedContent = useCallback(() => {
    setEditorMetaData({
      title: "",
      content: EditorState.createEmpty(),
      summary: "",
      thumbnail: null,
      hasComment: true,
      hasLike: true,
      hasHit: true,
    });
    setEditorLocalStoage(null);
  }, [setEditorLocalStoage, setEditorMetaData]);

  return {
    saveCurrentContent,
    resetSavedContent,
    loadSavedContent,
  };
};

export default useEditorUtils;
