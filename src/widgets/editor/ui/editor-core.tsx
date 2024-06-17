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

import { KeyCommandType } from "../constants";
import { CodeBlock } from "./custom-block";

import "draft-js/dist/Draft.css";
import FileUploadOverlay from "./file-upload-overlay";
import {
  Component,
  PropsWithChildren,
  memo,
  useCallback,
  useEffect,
} from "react";

type Props = {
  readOnly?: boolean;
  editorState?: EditorState; // Read Only 일 경우에 이 값을 넘겨주어여함.
};

class EditorWrapper extends Component<PropsWithChildren> {
  constructor(props: PropsWithChildren) {
    super(props);
  }

  componentDidCatch() {
    this.forceUpdate();
  }

  render() {
    return this.props.children;
  }
}

const EditorCore = memo(({ readOnly = false, editorState }: Props) => {
  const { open: openArticleImageOverlay } = shared.useOverlay();
  const { open: openFileUploadOverlay, exit: exitFileUploadOverlay } =
    shared.useOverlay();

  const { reset: resetEditorStore, setContent, content } = useEditorStore();
  const { open: toastOpen } = shared.useToast();
  const { read: readArticles } = shared.useBucket("articles");
  const { saveCurrentContent } = useEditorUtils();
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

  const handleOpenFileUploadOverlay = useCallback(
    () =>
      openFileUploadOverlay(({ isOpen }) => (
        <FileUploadOverlay isOpen={isOpen} />
      )),
    [openFileUploadOverlay]
  );

  const blockStyleFn = useCallback((contentBlock: ContentBlock) => {
    const type = contentBlock.getType();

    return shared.STYLE_MAPPER[type];
  }, []);

  const toggleInline = useCallback(
    (type: DraftInlineStyleType) => {
      setContent(RichUtils.toggleInlineStyle(content, type));
    },
    [content, setContent]
  );

  const toggleBlock = useCallback(
    (type: DraftBlockType) => {
      setContent(RichUtils.toggleBlockType(content, type));
    },
    [content, setContent]
  );

  // Event Handlers
  const handleSaveEditor = useCallback(() => {
    if (content.getCurrentContent().getPlainText() === "") {
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
  }, [content, saveCurrentContent, toastOpen]);

  const handleKeyCommand = useCallback(
    (command: KeyCommandType) => {
      const isHandled = matchKeyCommand({
        command,
        onBlockCommand: toggleBlock,
        onInlineCommand: toggleInline,
        onRefreshCommand: () => null,
        onSaveCommand: handleSaveEditor,
      });

      return isHandled;
    },
    [handleSaveEditor, toggleBlock, toggleInline]
  );

  const handleUploadedSuccess = useCallback(
    (url: string) => {
      // Image Upload
      toastOpen({
        type: "success",
        content: "이미지 업로드 완료",
        staleTime: 3000,
      });
      setContent(
        addImage({
          url: readArticles(url),
          editorState: content,
        })
      );
    },
    [content, readArticles, setContent, toastOpen]
  );

  const handleUploadedError = useCallback(
    (error: string) => {
      toastOpen({
        type: "error",
        content: error,
        staleTime: 3000,
      });
    },
    [toastOpen]
  );

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

  const handleOpenArticleImageDetail = useCallback(
    (url: string) =>
      openArticleImageOverlay(({ isOpen, exit }) => (
        <shared.ImageDetailOverlay open={isOpen} onClose={exit} url={url} />
      )),
    [openArticleImageOverlay]
  );

  useEffect(
    function autoSave() {
      const interval = setInterval(() => {
        handleSaveEditor();
      }, 30000);

      return () => {
        clearInterval(interval);
      };
    },
    [handleSaveEditor]
  );

  shared.useUnmount(() => resetEditorStore());

  return (
    <EditorWrapper>
      <Editor
        spellCheck={false}
        readOnly={readOnly}
        blockStyleFn={blockStyleFn}
        placeholder={shared.EDITOR_CONST.PLACEHOLDER}
        editorState={readOnly && editorState ? editorState : content}
        onChange={setContent}
        handleKeyCommand={handleKeyCommand}
        keyBindingFn={bindingKeyFunction}
        handlePastedFiles={handlePasteFile}
        handleDroppedFiles={handleDroppedFile}
        blockRendererFn={(block) =>
          blockRenderFn(block, content.getCurrentContent(), {
            onClick: handleOpenArticleImageDetail,
          })
        }
        blockRenderMap={blockRenderMap}
      />
    </EditorWrapper>
  );
});

EditorCore.displayName = "Editor Core";

export default EditorCore;
