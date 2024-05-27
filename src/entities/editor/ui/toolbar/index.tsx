import React, { useState } from "react";
import classNames from "classnames";
import { RichUtils, DraftInlineStyleType, DraftBlockType } from "draft-js";
import { useNavigate } from "react-router-dom";
import { BiArrowBack, BiSend } from "react-icons/bi";
import { IoHelp } from "react-icons/io5";

import * as constants from "../../constants";
import { useEditorStore } from "@/app/store";
import ShortcutDescriptionModal from "../shortcut-description-modal";

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
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);

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
      <div className="fixed top-0 left-0 z-10 flex items-center justify-between w-full px-10 py-2 bg-white">
        <div>
          <ToolbarItem onClick={() => navigate("/")}>
            <BiArrowBack />
          </ToolbarItem>
        </div>

        <div className="flex items-center justify-center">
          {constants.HEADERS_MAP.map(({ type, label }) => (
            <ToolbarItem
              key={type}
              onClick={() => toggleBlock(type)}
              selected={isActiveBlockStyle(type)}
            >
              {label}
            </ToolbarItem>
          ))}

          <div className="h-[30px] mx-2 border-r border-gray-300 border-solid" />

          {constants.INLINE_MAP.map(({ type, icon }) => (
            <ToolbarItem
              key={type}
              onClick={toggleInline(type)}
              selected={isActiveInlineStyle(type)}
            >
              {icon}
            </ToolbarItem>
          ))}

          {constants.BLOCK_MAP.map(({ type, icon }) => (
            <ToolbarItem
              key={type}
              onClick={() => toggleBlock(type)}
              selected={isActiveBlockStyle(type)}
            >
              {icon}
            </ToolbarItem>
          ))}

          <div className="h-[30px] mx-2 border-r border-gray-300 border-solid" />

          <ToolbarItem onClick={() => setIsDescriptionModalOpen(true)}>
            <IoHelp />
          </ToolbarItem>
        </div>

        <div>
          <ToolbarItem onClick={onPulish} selected disabled={isPublishDisabled}>
            <BiSend />
          </ToolbarItem>
        </div>
      </div>

      {isDescriptionModalOpen && (
        <ShortcutDescriptionModal
          onClose={() => setIsDescriptionModalOpen(false)}
        />
      )}
    </>
  );
};

export default Toolbar;
