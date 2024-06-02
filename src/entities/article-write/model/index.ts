import { EditorState } from "draft-js";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type EditorMetaData = {
  title: string;
  content: EditorState;
  summary: string;
  thumbnail: File | null;
  hasComment: boolean;
  hasLike: boolean;
  hasHit: boolean;
};

type State = {
  editorMetaData: EditorMetaData;
  open: {
    isSavedModalOpen: boolean;
    isImageUploadOverlayOpen: boolean;
    isImageDetailOverlayOpen: boolean;
  };
  detailTarget: string;
};

type Action = {
  setEditorMetaData: (newMetaData: EditorMetaData) => void;
  setOpen: (key: keyof State["open"], value: boolean) => void;
  setDetailTarget: (url: string) => void;
  reset: () => void;
};

const initialState: State = {
  editorMetaData: {
    title: "",
    content: EditorState.createEmpty(),
    summary: "",
    thumbnail: null,
    hasComment: true,
    hasLike: true,
    hasHit: true,
  },
  open: {
    isSavedModalOpen: false,
    isImageUploadOverlayOpen: false,
    isImageDetailOverlayOpen: false,
  },
  detailTarget: "",
};

const useEditorStore = create<State & Action>()(
  devtools((set) => ({
    ...initialState,
    setEditorMetaData: (newMetaData: EditorMetaData) =>
      set(() => ({ editorMetaData: newMetaData })),
    setOpen: (key, value) =>
      set((state) => ({
        ...state,
        open: {
          ...state.open,
          [key]: value,
        },
      })),
    setDetailTarget: (url: string) => set(() => ({ detailTarget: url })),
    reset: () => set(() => ({ ...initialState })),
  }))
);

export default useEditorStore;
