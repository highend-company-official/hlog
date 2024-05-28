import { createSelectors } from "@/shared";
import { create } from "zustand";

export type ViewMode = "card" | "list" | "gallery";

export enum SortType {
  trend = "trend",
  old = "old",
  new = "new",
}

type State = {
  articleViewMode: ViewMode;
  sortType: SortType;
};

type Action = {
  changeViewMode: (mode: ViewMode) => void;
  changeSortType: (newSortType: SortType) => void;
};

const useArticleStoreBase = create<State & Action>((set) => ({
  articleViewMode: "card",
  sortType: SortType.trend,
  changeViewMode: (mode) => set(() => ({ articleViewMode: mode })),
  changeSortType: (newSortType) => set(() => ({ sortType: newSortType })),
}));

const useArticleStore = createSelectors(useArticleStoreBase);

export default useArticleStore;
