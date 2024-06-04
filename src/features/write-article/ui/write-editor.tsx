import {
  DraftBlockType,
  DraftHandleValue,
  EditorState,
  RichUtils,
  SelectionState,
  type DraftInlineStyleType,
} from "draft-js";

import { useToastStore } from "@/app/model";
import * as shared from "@/shared";

import {
  type KeyCommandType,
  EditorCore,
  addImage,
  bindingKeyFunction,
  matchKeyCommand,
  uploadImage,
  SavedContentLoadModal,
  useEditorStore,
  useEditorUtils,
} from "@/entities/article";
import useOverlay from "@/shared/hooks/use-overlay";

const WriteEditor = () => {
  const {
    editorMetaData,
    setEditorMetaData,
    reset: resetEditorStore,
  } = useEditorStore();
  const { addToast } = useToastStore();
  const { read: readArticles } = shared.useBucket("articles");
  const { open } = useOverlay();
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

  shared.useMount(() => {
    if (loadSavedContent()) {
      open(({ exit, isOpen }) => (
        <SavedContentLoadModal open={isOpen} onClose={exit} />
      ));
    }
  });

  shared.useUnmount(() => resetEditorStore());

  return (
    <div id="hlog">
      <EditorCore
        editorState={editorMetaData.content}
        placeholder={shared.EDITOR_CONST.PLACEHOLDER}
        onChange={handleChangeEditor}
        handleKeyCommand={handleKeyCommand}
        keyBindingFn={bindingKeyFunction}
        handlePastedFiles={handlePasteFile}
        handleDroppedFiles={handleDroppedFile}
      />
    </div>
  );
};

export default WriteEditor;
