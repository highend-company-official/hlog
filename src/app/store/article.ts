import { create } from "zustand";

export type ViewMode = "card" | "list" | "gallery";

type State = {
  articleViewMode: ViewMode;
};

type Action = {
  changeViewMode: (mode: ViewMode) => void;
};

const useArticleStore = create<State & Action>((set) => ({
  articleViewMode: "card",
  changeViewMode: (mode) => set(() => ({ articleViewMode: mode })),
}));

export default useArticleStore;
