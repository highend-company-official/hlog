import { DraftBlockType, DraftInlineStyleType } from "draft-js";
import { KeyCommandType } from "../constants";

type Params = {
  command: KeyCommandType;
  onBlockCommand: (type: string) => void;
  onInlineCommand: (type: DraftInlineStyleType) => void;
  onSaveCommand: () => void;
  onRefreshCommand: () => void;
};

const matchKeyCommand = ({
  command,
  onBlockCommand,
  onInlineCommand,
  onSaveCommand,
  onRefreshCommand,
}: Params) => {
  const BLOCK_COMMANDS = [
    "header-one",
    "header-two",
    "header-three",
    "header-four",
    "header-five",
    "header-six",
    "ordered-list-item",
    "unordered-list-item",
    "code-block",
    "blockquote",
  ];

  const INLINE_COMMANDS = ["strikethrough", "bold", "italic", "underline"];

  if (BLOCK_COMMANDS.includes(command)) {
    onBlockCommand(command as DraftBlockType);
    return "handled";
  }

  if (INLINE_COMMANDS.includes(command)) {
    const upperCommand = command.toUpperCase();
    onInlineCommand(upperCommand as DraftInlineStyleType);
    return "handled";
  }

  if (command === "hlog-editor-save") {
    onSaveCommand();
    return "handled";
  }

  if (command === "hlog-editor-refresh") {
    onRefreshCommand();
    return "handled";
  }

  return "not-handled";
};

export default matchKeyCommand;
