import { EditorState } from "draft-js";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type EditorMetaData = {
  title: string;
  content: EditorState;
  summary: string;
  thumbnail: string;
  hasComment: boolean;
};

type State = {
  editorMetaData: EditorMetaData;
};

type Action = {
  setEditorMetaData: (newMetaData: EditorMetaData) => void;
};

const useEditorStore = create<State & Action>()(
  devtools((set) => ({
    editorMetaData: {
      title: "",
      content: EditorState.createEmpty(),
      summary: "",
      thumbnail: "",
      hasComment: true,
    },
    setEditorMetaData: (newMetaData: EditorMetaData) =>
      set(() => ({ editorMetaData: newMetaData })),
  }))
);

export default useEditorStore;
