import { create } from "zustand";

export type ViewMode = "card" | "list" | "gallery";

type State = {
  articleViewMode: ViewMode;
};

type Action = {
  changeViewMode: (mode: ViewMode) => void;
};

const useArticle = create<State & Action>((set) => ({
  articleViewMode: "card",
  changeViewMode: (mode) => set(() => ({ articleViewMode: mode })),
}));

export default useArticle;
