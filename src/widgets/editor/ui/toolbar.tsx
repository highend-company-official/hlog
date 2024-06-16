import React, { memo, useCallback, useMemo } from "react";
import classNames from "classnames";
import { IoHelp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { BiArrowBack, BiSend } from "react-icons/bi";
import { RichUtils, DraftInlineStyleType, DraftBlockType } from "draft-js";

import useOverlay from "@/shared/hooks/use-overlay";
import { useEditorStore } from "@/entities/article";

import { BLOCK_MAP, HEADERS_MAP, INLINE_MAP } from "../constants";
import ShortcutDescriptionModal from "./shortcut-description-modal";

type ToolbarItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  selected?: boolean;
  disabled?: boolean;
};

const ToolbarItem = memo((props: ToolbarItemProps) => {
  return (
    <button
      {...props}
      className={classNames(
        `w-10 h-10 flex items-center justify-center transition ease-in-out rounded-sm drop-shadow-sm disabled:cursor-not-allowed disabled:opacity-50`,
        {
          "bg-primary text-white": !!props.selected,
        }
      )}
    />
  );
});

type Props = {
  onPulish: () => void;
};

const Toolbar = memo(({ onPulish }: Props) => {
  const navigate = useNavigate();
  const { editorMetaData, content, setContent } = useEditorStore();
  const { open: openDescriptionModal } = useOverlay();

  const handleClickDescription = useCallback(() => {
    openDescriptionModal(({ isOpen, exit }) => (
      <ShortcutDescriptionModal open={isOpen} onClose={exit} />
    ));
  }, [openDescriptionModal]);

  const toggleInline = useCallback(
    (type: DraftInlineStyleType) =>
      (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setContent(RichUtils.toggleInlineStyle(content, type));
      },
    [content, setContent]
  );

  const toggleBlock = useCallback(
    (type: DraftBlockType) => () => {
      setContent(RichUtils.toggleBlockType(content, type));
    },
    [content, setContent]
  );

  const getIsActiveInlineStyle = useCallback(
    (type: string): boolean => {
      const currentStyle = content.getCurrentInlineStyle();
      return currentStyle.has(type);
    },
    [content]
  );

  const getIsActiveBlockStyle = useCallback(
    (type: string): boolean => {
      const selection = content.getSelection();
      const blockType = content
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

      return blockType === type;
    },
    [content]
  );

  const isPublishDisabled = useMemo(
    () =>
      editorMetaData.title.trim() === "" ||
      !content.getCurrentContent().hasText(),
    [content, editorMetaData.title]
  );

  return (
    <>
      <div className="fixed top-0 left-0 flex items-center justify-between z-10 w-full px-10 py-2 bg-white">
        <div>
          <ToolbarItem onClick={() => navigate("/")}>
            <BiArrowBack />
          </ToolbarItem>
        </div>

        <div className="flex items-center justify-center">
          {HEADERS_MAP.map(({ type, label }) => (
            <ToolbarItem
              key={type}
              onClick={toggleBlock(type)}
              selected={getIsActiveBlockStyle(type)}
            >
              {label}
            </ToolbarItem>
          ))}

          <div className="h-[30px] mx-2 border-r border-gray-300 border-solid" />

          {INLINE_MAP.map(({ type, icon }) => (
            <ToolbarItem
              key={type}
              onClick={toggleInline(type)}
              selected={getIsActiveInlineStyle(type)}
            >
              {icon}
            </ToolbarItem>
          ))}

          {BLOCK_MAP.map(({ type, icon }) => (
            <ToolbarItem
              key={type}
              onClick={toggleBlock(type)}
              selected={getIsActiveBlockStyle(type)}
            >
              {icon}
            </ToolbarItem>
          ))}

          <div className="h-[30px] mx-2 border-r border-gray-300 border-solid" />

          <ToolbarItem onClick={handleClickDescription}>
            <IoHelp />
          </ToolbarItem>
        </div>

        <div>
          <ToolbarItem onClick={onPulish} selected disabled={isPublishDisabled}>
            <BiSend />
          </ToolbarItem>
        </div>
      </div>
    </>
  );
});

ToolbarItem.displayName = "Toolbar Item";
Toolbar.displayName = "Toolbar";

export default Toolbar;
