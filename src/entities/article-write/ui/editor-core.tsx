import { lazy } from "react";
import useEditorStore from "@/entities/article-write/model";

import {
  EditorState,
  DraftInlineStyleType,
  RichUtils,
  DraftBlockType,
  DraftHandleValue,
  SelectionState,
  ContentBlock,
} from "draft-js";

import * as shared from "@/shared";
import { useToastStore } from "@/app/model";

import UploadOverlay from "@/entities/article-write/ui/file-upload-overlay";
import SaveLoadModal from "@/entities/article-write/ui/saved-content-load-modal";

import {
  bindingKeyFunction,
  matchKeyCommand,
  addImage,
  uploadImage,
  blockRenderFn,
} from "../lib";
import { useEditorUtils } from "../hooks";
import { KeyCommandType } from "../constants";

import "draft-js/dist/Draft.css";
import "@/shared/styles/index.css";
import "@/shared/styles/editor-style.css";

const Editor = lazy(() =>
  import("draft-js").then((module) => ({ default: module.Editor }))
);

const EditorCore = () => {
  const { addToast } = useToastStore();
  const { read: readArticles } = shared.useBucket("articles");
  const {
    editorMetaData,
    setEditorMetaData,
    reset: resetEditorStore,
    detailTarget,
    open: {
      isSavedModalOpen,
      isImageUploadOverlayOpen,
      isImageDetailOverlayOpen,
    },
    setOpen,
  } = useEditorStore();
  const { loadSavedContent, saveCurrentContent } = useEditorUtils();

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
      onRefreshCommand: () => null,
      onSaveCommand: handleSaveEditor,
    });

    return isHandled;
  };

  const handleChangeEditor = (editorContent: EditorState) => {
    setEditorMetaData({ ...editorMetaData, content: editorContent });
  };

  const handleUploadedSuccess = (url: string) => {
    // Image Upload
    setOpen("isImageUploadOverlayOpen", false);
    addToast({
      type: "success",
      content: "이미지 업로드 완료",
      staleTime: 3000,
    });
    setEditorMetaData({
      ...editorMetaData,
      content: addImage({
        url: readArticles(url),
        editorState: editorMetaData.content,
      }),
    });
  };

  const handleUploadedError = (error: string) => {
    setOpen("isImageUploadOverlayOpen", false);
    addToast({
      type: "error",
      content: error,
      staleTime: 3000,
    });
  };

  const handlePasteFile = (files: Blob[]): DraftHandleValue => {
    const pastedFile = files[0];

    setOpen("isImageUploadOverlayOpen", true);
    uploadImage({
      file: pastedFile as File,
      path: shared.generateRandomId(),
      successCb: handleUploadedSuccess,
      errorCb: handleUploadedError,
    });

    return "handled";
  };

  const handleDroppedFile = (
    _: SelectionState,
    files: Blob[]
  ): DraftHandleValue => {
    const droppedFile = files[0];

    setOpen("isImageUploadOverlayOpen", true);
    uploadImage({
      file: droppedFile as File,
      path: shared.generateRandomId(),
      successCb: handleUploadedSuccess,
      errorCb: handleUploadedError,
    });

    return "handled";
  };

  shared.useMount(() => {
    const savedContent = loadSavedContent();

    if (savedContent) {
      setOpen("isSavedModalOpen", true);
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
          handlePastedFiles={handlePasteFile}
          handleDroppedFiles={handleDroppedFile}
          blockStyleFn={blockStyleFn}
          blockRendererFn={(block) =>
            blockRenderFn(block, editorMetaData.content.getCurrentContent())
          }
        />
      </div>

      {isImageUploadOverlayOpen && <UploadOverlay />}
      {isImageDetailOverlayOpen && (
        <shared.ImageDetailOverlay
          url={detailTarget}
          onClose={() => setOpen("isImageDetailOverlayOpen", false)}
        />
      )}
      {isSavedModalOpen && <SaveLoadModal />}
    </>
  );
};

export default EditorCore;
