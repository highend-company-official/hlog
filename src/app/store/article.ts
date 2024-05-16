import { createSelectors } from "@/shared";
import { create } from "zustand";

export type ViewMode = "card" | "list" | "gallery";

type State = {
  articleViewMode: ViewMode;
};

type Action = {
  changeViewMode: (mode: ViewMode) => void;
};

const useArticleStoreBase = create<State & Action>((set) => ({
  articleViewMode: "card",
  changeViewMode: (mode) => set(() => ({ articleViewMode: mode })),
}));

const useArticleStore = createSelectors(useArticleStoreBase);

export default useArticleStore;
