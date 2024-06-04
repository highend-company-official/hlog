import { EditorState, convertFromRaw } from "draft-js";
import EditorCore from "./editor-core";

type Props = {
  content: string;
};

const Viewer = ({ content }: Props) => {
  const editorState = EditorState.createWithContent(
    convertFromRaw(JSON.parse(content))
  );

  <EditorCore readOnly editorState={editorState} />;
};

export default Viewer;
