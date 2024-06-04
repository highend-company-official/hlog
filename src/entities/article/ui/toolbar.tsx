import React from "react";
import classNames from "classnames";
import { IoHelp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { BiArrowBack, BiSend } from "react-icons/bi";
import { RichUtils, DraftInlineStyleType, DraftBlockType } from "draft-js";

import useOverlay from "@/shared/hooks/use-overlay";

import {
  useEditorStore,
  ShortcutDescriptionModal,
  HEADERS_MAP,
  INLINE_MAP,
  BLOCK_MAP,
} from "@/entities/article";

type ToolbarItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  selected?: boolean;
  disabled?: boolean;
};

const ToolbarItem = (props: ToolbarItemProps) => {
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
};

type Props = {
  onPulish: () => void;
};

const Toolbar = ({ onPulish }: Props) => {
  const navigate = useNavigate();
  const { editorMetaData, setEditorMetaData } = useEditorStore();
  const { open: openDescriptionModal } = useOverlay();

  const handleClickDescription = () => {
    openDescriptionModal(({ isOpen, exit }) => (
      <ShortcutDescriptionModal open={isOpen} onClose={exit} />
    ));
  };

  const isPublishDisabled =
    editorMetaData.title.trim() === "" ||
    !editorMetaData.content.getCurrentContent().hasText();

  const toggleInline =
    (type: DraftInlineStyleType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
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

  const isActiveInlineStyle = (type: string): boolean => {
    const currentStyle = editorMetaData.content.getCurrentInlineStyle();
    return currentStyle.has(type);
  };

  const isActiveBlockStyle = (type: string): boolean => {
    const selection = editorMetaData.content.getSelection();
    const blockType = editorMetaData.content
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

    return blockType === type;
  };

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
              onClick={() => toggleBlock(type)}
              selected={isActiveBlockStyle(type)}
            >
              {label}
            </ToolbarItem>
          ))}

          <div className="h-[30px] mx-2 border-r border-gray-300 border-solid" />

          {INLINE_MAP.map(({ type, icon }) => (
            <ToolbarItem
              key={type}
              onClick={toggleInline(type)}
              selected={isActiveInlineStyle(type)}
            >
              {icon}
            </ToolbarItem>
          ))}

          {BLOCK_MAP.map(({ type, icon }) => (
            <ToolbarItem
              key={type}
              onClick={() => toggleBlock(type)}
              selected={isActiveBlockStyle(type)}
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
};

export default Toolbar;
