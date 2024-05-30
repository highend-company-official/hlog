import { useState } from "react";
import useEditorStore from "@/entities/editor/model";

import Editor, { composeDecorators } from "@draft-js-plugins/editor";
import createImagePlugin from "@draft-js-plugins/image";
import createResizeablePlugin from "@draft-js-plugins/resizeable";
import createFocusPlugin from "@draft-js-plugins/focus";
import {
  KeyBindingUtil,
  getDefaultKeyBinding,
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

import useEditorUtils from "../../hooks";
import UploadOverlay from "../file-upload-overlay";
import { uploadArticleImage } from "../../lib";
import { KeyCommandType, styleMapper } from "../../constants";

import "draft-js/dist/Draft.css";
import "@/shared/styles/index.css";
import "./index.css";

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
  const { saveCurrentContent, loadSavedContent } = useEditorUtils();

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

  const customKeyBindingFunction = (e: React.KeyboardEvent) => {
    if (KeyBindingUtil.hasCommandModifier(e) && e.key === "1") {
      return "header-one";
    }
    if (KeyBindingUtil.hasCommandModifier(e) && e.key === "2") {
      return "header-two";
    }
    if (KeyBindingUtil.hasCommandModifier(e) && e.key === "3") {
      return "header-three";
    }
    if (KeyBindingUtil.hasCommandModifier(e) && e.key === "4") {
      return "header-four";
    }
    if (KeyBindingUtil.hasCommandModifier(e) && e.key === "5") {
      return "header-five";
    }
    if (KeyBindingUtil.hasCommandModifier(e) && e.key === "6") {
      return "header-six";
    }
    if (KeyBindingUtil.hasCommandModifier(e) && e.shiftKey && e.key === "o") {
      return "ordered-list-item";
    }
    if (KeyBindingUtil.hasCommandModifier(e) && e.shiftKey && e.key === "u") {
      return "unordered-list-item";
    }
    if (KeyBindingUtil.hasCommandModifier(e) && e.shiftKey && e.key === "q") {
      return "blockquote";
    }
    if (KeyBindingUtil.hasCommandModifier(e) && e.shiftKey && e.key === "x") {
      return "strikethrough";
    }
    if (KeyBindingUtil.hasCommandModifier(e) && e.shiftKey && e.key === "c") {
      return "code-block";
    }
    if (KeyBindingUtil.hasCommandModifier(e) && e.key === "u") {
      return "underline";
    }
    if (KeyBindingUtil.hasCommandModifier(e) && e.key === "s") {
      return "hlog-editor-save";
    }
    if (KeyBindingUtil.hasCommandModifier(e) && e.key === "r") {
      return "hlog-editor-refresh";
    }
    return getDefaultKeyBinding(e);
  };

  const handleKeyCommand = (command: KeyCommandType) => {
    if (command === "hlog-editor-save") {
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
      return "handled";
    }
    if (command === "header-one") {
      toggleBlock(command);
      return "handled";
    }
    if (command === "header-two") {
      toggleBlock(command);
      return "handled";
    }
    if (command === "header-three") {
      toggleBlock(command);
      return "handled";
    }
    if (command === "header-four") {
      toggleBlock(command);
      return "handled";
    }
    if (command === "header-five") {
      toggleBlock(command);
      return "handled";
    }
    if (command === "header-six") {
      toggleBlock(command);
      return "handled";
    }
    if (command === "strikethrough") {
      toggleInline("STRIKETHROUGH");
      return "handled";
    }
    if (command === "bold") {
      toggleInline("BOLD");
      return "handled";
    }
    if (command === "italic") {
      toggleInline("ITALIC");
      return "handled";
    }
    if (command === "underline") {
      toggleInline("UNDERLINE");
      return "handled";
    }
    if (command === "ordered-list-item") {
      toggleBlock(command);
      return "handled";
    }
    if (command === "unordered-list-item") {
      toggleBlock(command);
      return "handled";
    }
    if (command === "code-block") {
      toggleBlock(command);
      return "handled";
    }
    if (command === "blockquote") {
      toggleBlock(command);
      return "handled";
    }
    if (command === "hlog-editor-refresh") {
      return "handled";
    }
    return "not-handled";
  };

  const blockStyleFn = (contentBlock: ContentBlock) => {
    const type = contentBlock.getType();

    return styleMapper[type];
  };

  const loadContentToEditor = () => {
    const loadedContent = loadSavedContent();

    if (loadedContent) {
      setEditorMetaData({
        ...loadedContent,
        content: EditorState.createWithContent(loadedContent.content),
      });
      setIsSavedModalOpen(false);
    }
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

  shared.useUnmount(() => resetEditorStore());

  return (
    <>
      <div id="hlog">
        <Editor
          editorState={editorMetaData.content}
          onChange={handleChangeEditor}
          placeholder={shared.EDITOR_CONST.PLACEHOLDER}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={customKeyBindingFunction}
          spellCheck={false}
          plugins={plugins}
          handlePastedFiles={handlePasteFile}
          handleDroppedFiles={handleDroppedFile}
          blockStyleFn={blockStyleFn}
        />
      </div>

      {isImageUploading && <UploadOverlay />}

      {isSavedModalOpen && (
        <shared.Modal>
          <shared.Modal.Header>
            이전에 작성된 글이 있습니다.
          </shared.Modal.Header>
          <shared.Modal.Content>
            해당 글을 불러오시겠습니까?
          </shared.Modal.Content>
          <shared.Modal.Footer align="right">
            <shared.Modal.Button
              type="normal"
              onClick={() => setIsSavedModalOpen(false)}
            >
              아니요
            </shared.Modal.Button>
            <div className="ml-2" />
            <shared.Modal.Button type="accept" onClick={loadContentToEditor}>
              네
            </shared.Modal.Button>
          </shared.Modal.Footer>
        </shared.Modal>
      )}
    </>
  );
};

export default EditorCore;
