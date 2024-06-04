import {
  DraftBlockType,
  DraftEditorCommand,
  DraftInlineStyleType,
} from "draft-js";
import { BiBold, BiItalic, BiStrikethrough, BiUnderline } from "react-icons/bi";
import { FaListOl, FaListUl } from "react-icons/fa";
import { PiCodeBlockLight } from "react-icons/pi";
import { TbBlockquote } from "react-icons/tb";

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
  | "header-five"
  | "header-six"
  | "unordered-list-item"
  | "ordered-list-item"
  | "blockquote"
  | "code-block"
  | "hlog-editor-save"
  | "hlog-editor-refresh";
