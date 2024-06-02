import React, { useState } from "react";
import useEditorStore from "@/entities/article-write/model";

import { composeDecorators } from "@draft-js-plugins/editor";
import createImagePlugin from "@draft-js-plugins/image";
import createResizeablePlugin from "@draft-js-plugins/resizeable";
import createFocusPlugin from "@draft-js-plugins/focus";
import {
  EditorState,
  DraftInlineStyleType,
  RichUtils,
  DraftBlockType,
  DraftHandleValue,
  AtomicBlockUtils,
  SelectionState,
  ContentBlock,
} from "draft-js";

import * as shared from "@/shared";
import { useToastStore } from "@/app/model";

import UploadOverlay from "@/entities/article-write/ui/file-upload-overlay";
import SaveLoadModal from "@/entities/article-write/ui/saved-content-load-modal";
import { uploadArticleImage, bindingKeyFunction } from "../lib";
import { useEditorUtils } from "../hooks";

import "draft-js/dist/Draft.css";
import "@/shared/styles/index.css";
import "@/shared/styles/editor-style.css";
import { matchKeyCommand } from "../utils";
import { KeyCommandType } from "../constants";

const Editor = React.lazy(() => import("@draft-js-plugins/editor"));

const resizeablePlugin = createResizeablePlugin();
const focusPlugin = createFocusPlugin();
const decorator = composeDecorators(
  resizeablePlugin.decorator,
  focusPlugin.decorator
);
const imagePlugin = createImagePlugin({ decorator });

const plugins = [imagePlugin, resizeablePlugin, focusPlugin];

const EditorCore = () => {
  const { addToast } = useToastStore();
  const { read: readArticles } = shared.useBucket("articles");
  const {
    editorMetaData,
    setEditorMetaData,
    reset: resetEditorStore,
  } = useEditorStore();
  const { loadSavedContent, saveCurrentContent } = useEditorUtils();

  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);

  const toggleInline = (type: DraftInlineStyleType) => {
    setEditorMetaData({
      ...editorMetaData,
      content: RichUtils.toggleInlineStyle(editorMetaData.content, type),
    });
  };

  const toggleBlock = (type: DraftBlockType) => {
    setEditorMetaData({
      ...editorMetaData,
      content: RichUtils.toggleBlockType(editorMetaData.content, type),
    });
  };

  const blockStyleFn = (contentBlock: ContentBlock) => {
    const type = contentBlock.getType();

    return shared.STYLE_MAPPER[type];
  };

  const insertPastedImage = (url: string) => {
    const currentContent = editorMetaData.content.getCurrentContent();
    const contentStateWithEntity = currentContent.createEntity(
      "IMAGE",
      "IMMUTABLE",
      {
        src: url,
      }
    );

    const imageEntityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorMetaData.content, {
      currentContent: contentStateWithEntity,
    });

    return AtomicBlockUtils.insertAtomicBlock(
      newEditorState,
      imageEntityKey,
      " "
    );
  };

  // Event Handlers
  const handleSaveEditor = () => {
    if (editorMetaData.content.getCurrentContent().getPlainText() === "") {
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
  };

  const handleKeyCommand = (command: KeyCommandType) => {
    const isHandled = matchKeyCommand({
      command,
      onBlockCommand: toggleBlock,
      onInlineCommand: toggleInline,
      onRefreshCommand: handleSaveEditor,
      onSaveCommand: () => null,
    });

    return isHandled;
  };

  const handleChangeEditor = (editorContent: EditorState) => {
    setEditorMetaData({ ...editorMetaData, content: editorContent });
  };

  const handleUploadedSuccess = (url: string) => {
    // Image Upload
    setIsImageUploading(false);
    addToast({
      type: "success",
      content: "이미지 업로드 완료",
      staleTime: 3000,
    });
    setEditorMetaData({
      ...editorMetaData,
      content: insertPastedImage(readArticles(url)),
    });
  };

  const handleUploadedError = (error: string) => {
    setIsImageUploading(false);
    addToast({
      type: "error",
      content: error,
      staleTime: 3000,
    });
  };

  const handlePasteFile = (files: Blob[]): DraftHandleValue => {
    const pastedFile = files[0];

    setIsImageUploading(true);
    uploadArticleImage(
      shared.generateRandomId(),
      pastedFile as File,
      handleUploadedSuccess,
      handleUploadedError
    );

    return "handled";
  };

  const handleDroppedFile = (
    _: SelectionState,
    files: Blob[]
  ): DraftHandleValue => {
    const droppedFile = files[0];

    setIsImageUploading(true);
    uploadArticleImage(
      shared.generateRandomId(),
      droppedFile as File,
      handleUploadedSuccess,
      handleUploadedError
    );

    return "handled";
  };

  shared.useMount(() => {
    const savedContent = loadSavedContent();

    if (savedContent) {
      setIsSavedModalOpen(true);
    }
  });

  shared.useUnmount(() => resetEditorStore());

  return (
    <>
      <div id="hlog">
        <Editor
          editorState={editorMetaData.content}
          onChange={handleChangeEditor}
          placeholder={shared.EDITOR_CONST.PLACEHOLDER}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={bindingKeyFunction}
          spellCheck={false}
          plugins={plugins}
          handlePastedFiles={handlePasteFile}
          handleDroppedFiles={handleDroppedFile}
          blockStyleFn={blockStyleFn}
        />
      </div>

      {isImageUploading && <UploadOverlay />}

      {isSavedModalOpen && (
        <SaveLoadModal
          onCancel={() => setIsSavedModalOpen(false)}
          onLoad={() => setIsSavedModalOpen(false)}
        />
      )}
    </>
  );
};

export default EditorCore;
