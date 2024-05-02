import { RichUtils, DraftInlineStyleType } from "draft-js";
import * as shared from "@/shared";

import useEditor from "../../hooks";

const Toolbar = () => {
  const { editorState, saveCurrentContent, setEditorState } = useEditor();

  const inlineToggler =
    (type: DraftInlineStyleType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setEditorState(RichUtils.toggleInlineStyle(editorState, type));
    };

  return (
    <div className="h-[10%]">
      <shared.Button onClick={saveCurrentContent}>저장</shared.Button>
      <shared.Button onClick={inlineToggler("BOLD")}>BOLD</shared.Button>
      <shared.Button onClick={inlineToggler("ITALIC")}>ITALIC</shared.Button>
      <shared.Button onClick={inlineToggler("STRIKETHROUGH")}>
        STRIKETHROUGH
      </shared.Button>
      <shared.Button onClick={inlineToggler("UNDERLINE")}>
        UNDERLINE
      </shared.Button>
    </div>
  );
};

export default Toolbar;
