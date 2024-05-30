import {
  DraftBlockType,
  DraftEditorCommand,
  DraftInlineStyleType,
} from "draft-js";
import { BiBold, BiItalic, BiStrikethrough, BiUnderline } from "react-icons/bi";
import { FaListOl, FaListUl } from "react-icons/fa";
import { TbBlockquote } from "react-icons/tb";
import { PiCodeBlockLight } from "react-icons/pi";

export const INLINE_MAP: {
  type: DraftInlineStyleType;
  icon: React.ReactElement;
}[] = [
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

export const HEADERS_MAP: { type: DraftBlockType; label: string }[] = [
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

export const BLOCK_MAP: { type: DraftBlockType; icon: React.ReactElement }[] = [
  {
    type: "unordered-list-item",
    icon: <FaListUl />,
  },
  {
    type: "ordered-list-item",
    icon: <FaListOl />,
  },
  {
    type: "blockquote",
    icon: <TbBlockquote />,
  },
  {
    type: "code-block",
    icon: <PiCodeBlockLight />,
  },
];

export const KEY_MAPPER = {
  "> ": "blockquote",
  "*.": "unordered-list-item",
  "* ": "unordered-list-item",
  "- ": "unordered-list-item",
  "1.": "ordered-list-item",
  "# ": "header-one",
  "##": "header-two",
  "==": "unstyled",
  "` ": "code-block",
};

export type KeyCommandType =
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

export const styleMapper: { [type in string]: string } = {
  blockquote: "hlog-blockquote",
  "header-one": "hlog-header-one",
  "header-two": "hlog-header-two",
  "header-three": "hlog-header-three",
  "header-four": "hlog-header-four",
  "header-five": "hlog-header-five",
  "header-six": "hlog-header-six",
  "unordered-list-item": "hlog-unordered-list-item",
  "ordered-list-item": "hlog-ordered-list-item",
  "code-block": "hlog-code-block",
  unstyled: "hlog_paragraph",
};
