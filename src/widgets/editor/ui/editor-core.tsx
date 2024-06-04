import {
  DraftBlockType,
  DraftHandleValue,
  EditorState,
  RichUtils,
  SelectionState,
  ContentBlock,
  type DraftInlineStyleType,
} from "draft-js";

import { lazy } from "react";

import * as shared from "@/shared";

import { bindingKeyFunction, blockRenderFn, matchKeyCommand } from "../lib";

import { useEditorStore } from "@/entities/article";
import { useToastStore } from "@/app/model";
import { useEditorUtils } from "../hooks";
import SavedContentLoadModal from "./saved-content-load-modal";
import { addImage, uploadImage } from "../lib/image-util";

import "draft-js/dist/Draft.css";
import { KeyCommandType } from "../constants";

const Editor = lazy(() =>
  import("draft-js").then((module) => ({ default: module.Editor }))
);

type Props = {
  readOnly?: boolean;
  editorState?: EditorState; // Read Only 일 경우에 이 값을 넘겨주어여함.
};

const EditorCore = ({ readOnly = false, editorState }: Props) => {
  const { open: openArticleOverlay } = shared.useOverlay();
  const {
    editorMetaData,
    setEditorMetaData,
    reset: resetEditorStore,
  } = useEditorStore();
  const { addToast } = useToastStore();
  const { read: readArticles } = shared.useBucket("articles");
  const { open } = shared.useOverlay();
  const { loadSavedContent, saveCurrentContent } = useEditorUtils();

  shared.useMount(() => {
    if (loadSavedContent()) {
      open(({ exit, isOpen }) => (
        <SavedContentLoadModal open={isOpen} onClose={exit} />
      ));
    }
  });

  shared.useUnmount(() => resetEditorStore());
  const blockStyleFn = (contentBlock: ContentBlock) => {
    const type = contentBlock.getType();

    return shared.STYLE_MAPPER[type];
  };

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
    addToast({
      type: "error",
      content: error,
      staleTime: 3000,
    });
  };

  const handlePasteFile = (files: Blob[]): DraftHandleValue => {
    const pastedFile = files[0];

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

    uploadImage({
      file: droppedFile as File,
      path: shared.generateRandomId(),
      successCb: handleUploadedSuccess,
      errorCb: handleUploadedError,
    });

    return "handled";
  };

  const handleOpenArticleDetail = (url: string) =>
    openArticleOverlay(({ isOpen, exit }) => (
      <shared.ImageDetailOverlay open={isOpen} onClose={exit} url={url} />
    ));

  return (
    <div id="hlog">
      <Editor
        spellCheck={false}
        readOnly={readOnly}
        blockStyleFn={blockStyleFn}
        placeholder={shared.EDITOR_CONST.PLACEHOLDER}
        editorState={
          readOnly && editorState ? editorState : editorMetaData.content
        }
        onChange={handleChangeEditor}
        handleKeyCommand={handleKeyCommand}
        keyBindingFn={bindingKeyFunction}
        handlePastedFiles={handlePasteFile}
        handleDroppedFiles={handleDroppedFile}
        blockRendererFn={(block) =>
          blockRenderFn(block, editorMetaData.content.getCurrentContent(), {
            onClick: handleOpenArticleDetail,
          })
        }
      />
    </div>
  );
};

export default EditorCore;
