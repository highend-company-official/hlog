import React, { useState } from "react";
import classNames from "classnames";
import { RichUtils, DraftInlineStyleType, DraftBlockType } from "draft-js";
import { useNavigate } from "react-router-dom";
import {
  BiBold,
  BiItalic,
  BiStrikethrough,
  BiUnderline,
  BiArrowBack,
  BiSend,
} from "react-icons/bi";

import useEditor from "../../hooks";

import ArticleSettingModal from "../setting-modal";
import { SelectBox } from "@/shared";

type ToolbarItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  selected?: boolean;
};

const ToolbarItem = (props: ToolbarItemProps) => {
  return (
    <button
      {...props}
      className={classNames(
        `w-10 h-10 flex items-center justify-center rounded-sm drop-shadow-sm`,
        {
          "bg-primary text-white": !!props.selected,
        }
      )}
    />
  );
};

const INLINE_MAP: { type: DraftInlineStyleType; icon: React.ReactElement }[] = [
  {
    type: "BOLD",
    icon: <BiBold />,
  },
  {
    type: "ITALIC",
    icon: <BiItalic />,
  },
  {
    type: "STRIKETHROUGH",
    icon: <BiStrikethrough />,
  },
  {
    type: "UNDERLINE",
    icon: <BiUnderline />,
  },
];

const HEADERS_MAP: { type: DraftBlockType; label: string }[] = [
  {
    type: "header-one",
    label: "H1",
  },
  {
    type: "header-two",
    label: "H2",
  },
  {
    type: "header-three",
    label: "H3",
  },
  {
    type: "header-four",
    label: "H4",
  },
  {
    type: "header-five",
    label: "H5",
  },
  {
    type: "header-six",
    label: "H6",
  },
];

const Toolbar = () => {
  const navigate = useNavigate();
  const { editorState, setEditorState } = useEditor();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleInline =
    (type: DraftInlineStyleType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setEditorState((prev) => ({
        ...prev,
        content: RichUtils.toggleInlineStyle(editorState.content, type),
      }));
    };

  const toggleBlock = (type: DraftBlockType) => {
    setEditorState((prev) => ({
      ...prev,
      content: RichUtils.toggleBlockType(editorState.content, type),
    }));
  };

  const handlePostArticle = () => {
    setIsModalOpen(true);
  };

  const isActiveInlineStyle = (type: string): boolean => {
    const currentStyle = editorState.content.getCurrentInlineStyle();
    return currentStyle.has(type);
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
          <SelectBox onChange={(type) => toggleBlock(type)}>
            {HEADERS_MAP.map(({ type, label }) => (
              <SelectBox.Option
                selected={isActiveInlineStyle(type)}
                label={label}
                value={type}
              />
            ))}
          </SelectBox>

          <div className="mr-2" />

          {INLINE_MAP.map(({ type, icon }) => (
            <ToolbarItem
              onClick={toggleInline(type)}
              selected={isActiveInlineStyle(type)}
            >
              {icon}
            </ToolbarItem>
          ))}
        </div>

        <div>
          <ToolbarItem onClick={handlePostArticle} selected>
            <BiSend />
          </ToolbarItem>
        </div>
      </div>

      {isModalOpen && (
        <ArticleSettingModal onCancel={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default Toolbar;
