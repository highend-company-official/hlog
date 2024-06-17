import {
  ContentState,
  convertFromRaw,
  convertToRaw,
  EditorState,
} from "draft-js";
import { useCallback } from "react";
import { TablesInsert } from "types/generated-database.types";

import { useEditorStore } from "@/entities/article";
import * as shared from "@/shared";

type LocalStorageType = {
  title: string;
  content: string;
  summary: string;
  thumbnail: File | null;
  category: TablesInsert<"categories">[];
  hasComment: boolean;
  hasLike: boolean;
  hasHit: boolean;
};

const useEditorUtils = () => {
  const { editorMetaData, setEditorMetaData, content, setContent } =
    useEditorStore();
  const [editorLocalStorage, setEditorLocalStoage] =
    shared.useLocalStorage<LocalStorageType | null>(
      shared.STORAGE_CONSTS.HLOG_EDITOR,
      null
    );

  const parseSavedContentToState = (targetContent: string) => {
    const json = JSON.parse(targetContent);
    return EditorState.createWithContent(convertFromRaw(json));
  };

  const parseEditorStateToSave = (targetContent: EditorState) => {
    return JSON.stringify(convertToRaw(targetContent.getCurrentContent()));
  };

  const saveCurrentContent = useCallback(() => {
    setEditorLocalStoage({
      ...editorMetaData,
      content: parseEditorStateToSave(content),
    });
  }, [content, editorMetaData, setEditorLocalStoage]);

  const loadSavedEditorMetaData = useCallback(() => {
    if (editorLocalStorage) {
      return {
        ...editorLocalStorage,
        content: parseSavedContentToState(editorLocalStorage.content),
      };
    }
  }, [editorLocalStorage]);

  const getPlaneTextLength = (content: ContentState) => {
    const blocks = convertToRaw(content).blocks;
    const value = blocks
      .map((block) => (!block.text.trim() && "\n") || block.text)
      .join("\n");

    return value.length;
  };

  const resetSavedEditorMetaData = useCallback(() => {
    setEditorMetaData({
      title: "",
      summary: "",
      thumbnail: null,
      category: [],
      hasComment: true,
      hasLike: true,
      hasHit: true,
    });
    setContent(EditorState.createEmpty());
    setEditorLocalStoage(null);
  }, [setContent, setEditorLocalStoage, setEditorMetaData]);

  return {
    saveCurrentContent,
    resetSavedEditorMetaData,
    loadSavedEditorMetaData,
    parseSavedContentToState,
    parseEditorStateToSave,
    getPlaneTextLength,
  };
};

export default useEditorUtils;
