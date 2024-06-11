import { EditorState } from "draft-js";
import { TablesInsert } from "types/generated-database.types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type EditorMetaData = {
  title: string;
  summary: string;
  thumbnail: File | null;
  hasComment: boolean;
  hasLike: boolean;
  hasHit: boolean;
  category: TablesInsert<"categories">[];
};

type State = {
  editorMetaData: EditorMetaData;
  content: EditorState;
};

type Action = {
  setEditorMetaData: (newMetaData: EditorMetaData) => void;
  setContent: (newContent: EditorState) => void;
  reset: () => void;
};

const initialState: Omit<State, "content"> = {
  editorMetaData: {
    title: "",
    summary: "",
    thumbnail: null,
    hasComment: true,
    hasLike: true,
    hasHit: true,
    category: [],
  },
};

const useEditorStore = create<State & Action>()(
  devtools((set) => ({
    ...initialState,
    content: EditorState.createEmpty(),
    setEditorMetaData: (newMetaData: EditorMetaData) =>
      set((state) => ({
        ...state,
        editorMetaData: newMetaData,
      })),
    setContent: (newContent: EditorState) =>
      set((state) => ({
        ...state,
        content: newContent,
      })),
    reset: () =>
      set(() => ({
        ...initialState,
        content: EditorState.createEmpty(),
      })),
  }))
);

export default useEditorStore;
