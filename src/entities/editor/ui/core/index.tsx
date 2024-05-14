import { memo, useEffect, useMemo, useState } from "react";
import { useEditorStore, useToastStore } from "@/app/store";
import Editor from "@draft-js-plugins/editor";
import {
  KeyBindingUtil,
  getDefaultKeyBinding,
  type DraftEditorCommand,
  EditorState,
  ContentBlock,
  DraftInlineStyleType,
  RichUtils,
  DraftBlockType,
} from "draft-js";
import createInlineToolbarPlugin from "@draft-js-plugins/inline-toolbar";

import useEditorUtils from "../../hooks";
import * as shared from "@/shared";

import "draft-js/dist/Draft.css";
import "prismjs/themes/prism.css";
import "@draft-js-plugins/inline-toolbar/lib/plugin.css";
import "./index.css";

type KeyCommandType =
  | DraftEditorCommand
  | "header-one"
  | "header-two"
  | "header-three"
  | "header-four"
  | "unordered-list-item"
  | "ordered-list-item"
  | "blockquote"
  | "code-block"
  | "header-five"
  | "header-six"
  | "hlog-editor-save"
  | "hlog-editor-refresh";

const EditorCore = memo(() => {
  const { addToast } = useToastStore();
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const {
    editorMetaData,
    setEditorMetaData,
    reset: resetEditorStore,
  } = useEditorStore();
  const { saveCurrentContent, loadSavedContent } = useEditorUtils();

  // When Exit Reset State !!
  const [plugins, InlineToolbar] = useMemo(() => {
    const inlineToolbarPlugin = createInlineToolbarPlugin();
    return [[inlineToolbarPlugin], inlineToolbarPlugin.InlineToolbar];
  }, []);

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
    if (KeyBindingUtil.hasCommandModifier(e) && e.shiftKey && e.key === "b") {
      return "blockquote";
    }
    if (KeyBindingUtil.hasCommandModifier(e) && e.key === ",") {
      return "code-block";
    }
    if (KeyBindingUtil.hasCommandModifier(e) && e.key === "x") {
      return "strikethrough";
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

  const blockStyleFunction = (contentBlock: ContentBlock) => {
    const type = contentBlock.getType();

    switch (type) {
      case "blockquote":
        return "hlog_blockquote";
      case "header-one":
        return "hlog_header_one";
      case "header-two":
        return "hlog_header_two";
      case "header-three":
        return "hlog_header_three";
      case "header-four":
        return "hlog_header_four";
      case "header-five":
        return "hlog_header_five";
      case "header-six":
        return "hlog_header_six";
      case "unordered-list-item":
        return "hlog_unordered-list";
      case "ordered-list-item":
        return "hlog_ordered-list";
      case "code-block":
        return "hlog-code_block";
      default:
        return "";
    }
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

  const handleChangeEditor = (editorContent: EditorState) => {
    setEditorMetaData({ ...editorMetaData, content: editorContent });
  };

  useEffect(() => {
    const loadedContent = loadSavedContent();
    if (loadedContent?.content.hasText()) {
      setIsSavedModalOpen(true);
    }
  }, [loadSavedContent]);

  useEffect(
    () => () => {
      resetEditorStore();
    },
    [resetEditorStore]
  );

  return (
    <>
      <Editor
        editorState={editorMetaData.content}
        onChange={handleChangeEditor}
        placeholder={shared.EDITOR_CONST.PLACEHOLDER}
        handleKeyCommand={handleKeyCommand}
        keyBindingFn={customKeyBindingFunction}
        spellCheck={false}
        blockStyleFn={blockStyleFunction}
        plugins={plugins}
      />

      <InlineToolbar />

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
              type="decline"
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
});

export default EditorCore;
