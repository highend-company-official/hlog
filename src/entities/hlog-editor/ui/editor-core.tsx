import { lazy } from "react";
import { ContentBlock } from "draft-js";

import * as shared from "@/shared";

import { blockRenderFn } from "../lib";

import "draft-js/dist/Draft.css";
import "@/shared/styles/index.css";
import "@/shared/styles/editor-style.css";

const Editor = lazy(() =>
  import("draft-js").then((module) => ({ default: module.Editor }))
);

type Props = {
  readOnly?: boolean;
} & Draft.EditorProps;

const EditorCore = ({ readOnly = false, ...editorProps }: Props) => {
  const blockStyleFn = (contentBlock: ContentBlock) => {
    const type = contentBlock.getType();

    return shared.STYLE_MAPPER[type];
  };

  return (
    <>
      <div id="hlog">
        <Editor
          spellCheck={false}
          readOnly={readOnly}
          blockStyleFn={blockStyleFn}
          blockRendererFn={(block) =>
            blockRenderFn(block, editorProps.editorState.getCurrentContent())
          }
          {...editorProps}
        />
      </div>
    </>
  );
};

export default EditorCore;
