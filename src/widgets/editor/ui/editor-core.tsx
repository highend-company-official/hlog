import {
  DraftBlockType,
  DraftHandleValue,
  EditorState,
  RichUtils,
  SelectionState,
  ContentBlock,
  type DraftInlineStyleType,
  DefaultDraftBlockRenderMap,
  Editor,
} from "draft-js";
import Immutable from "immutable";

import * as shared from "@/shared";

import { useEditorStore } from "@/entities/article";

import { useEditorUtils } from "../hooks";
import {
  bindingKeyFunction,
  blockRenderFn,
  matchKeyCommand,
  addImage,
  uploadImage,
} from "../lib";
import SavedContentLoadModal from "./saved-content-load-modal";

import { KeyCommandType } from "../constants";
import { CodeBlock } from "./custom-block";

import "draft-js/dist/Draft.css";
import FileUploadOverlay from "./file-upload-overlay";

type Props = {
  readOnly?: boolean;
  editorState?: EditorState; // Read Only 일 경우에 이 값을 넘겨주어여함.
};

const EditorCore = ({ readOnly = false, editorState }: Props) => {
  const { open: openArticleOverlay } = shared.useOverlay();
  const { open: openFileUploadOverlay, exit: exitFileUploadOverlay } =
    shared.useOverlay();

  const {
    editorMetaData,
    setEditorMetaData,
    reset: resetEditorStore,
  } = useEditorStore();
  const { open: toastOpen } = shared.useToast();
  const { read: readArticles } = shared.useBucket("articles");
  const { open } = shared.useOverlay();
  const { loadSavedContent, saveCurrentContent } = useEditorUtils();
  const { data: session } = shared.useSession();
  const profile = shared.useProfile(session?.user.id);

  const isVerified = profile?.verified === "verified";

  const blockRenderMap = DefaultDraftBlockRenderMap.merge(
    Immutable.Map({
      "code-block": {
        wrapper: <CodeBlock />,
      },
    })
  );

  const handleOpenFileUploadOverlay = () =>
    openFileUploadOverlay(({ isOpen }) => (
      <FileUploadOverlay isOpen={isOpen} />
    ));

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
      toastOpen({
        type: "warning",
        content: "저장을 위해서 내용을 입력해주세요",
        hasCloseButton: false,
        staleTime: 3000,
      });
      return "handled";
    }

    saveCurrentContent();
    toastOpen({
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
    toastOpen({
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
    toastOpen({
      type: "error",
      content: error,
      staleTime: 3000,
    });
  };

  const handlePasteFile = (files: Blob[]): DraftHandleValue => {
    if (!isVerified) {
      toastOpen({
        type: "warning",
        content: "해당 기능은 인증된 유저만 사용할 수 있습니다.",
        staleTime: 3000,
      });
      return "not-handled";
    }

    const pastedFile = files[0];

    handleOpenFileUploadOverlay();
    uploadImage({
      file: pastedFile as File,
      path: shared.generateRandomId(),
      successCb: handleUploadedSuccess,
      errorCb: handleUploadedError,
      finallyCb: exitFileUploadOverlay,
    });

    return "handled";
  };

  const handleDroppedFile = (
    _: SelectionState,
    files: Blob[]
  ): DraftHandleValue => {
    if (!isVerified) {
      toastOpen({
        type: "warning",
        content: "해당 기능은 인증된 유저만 사용할 수 있습니다.",
        staleTime: 3000,
      });
      return "not-handled";
    }

    handleOpenFileUploadOverlay();
    const droppedFile = files[0];

    uploadImage({
      file: droppedFile as File,
      path: shared.generateRandomId(),
      successCb: handleUploadedSuccess,
      errorCb: handleUploadedError,
      finallyCb: exitFileUploadOverlay,
    });

    return "handled";
  };

  const handleOpenArticleDetail = (url: string) =>
    openArticleOverlay(({ isOpen, exit }) => (
      <shared.ImageDetailOverlay open={isOpen} onClose={exit} url={url} />
    ));

  shared.useMount(() => {
    if (loadSavedContent() && !readOnly) {
      open(({ exit, isOpen }) => (
        <SavedContentLoadModal open={isOpen} onClose={exit} />
      ));
    }
  });

  shared.useUnmount(() => resetEditorStore());

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
        blockRenderMap={blockRenderMap}
      />
    </div>
  );
};

export default EditorCore;
