import { create } from "zustand";

import { createSelectors } from "@/shared";

export type ViewMode = "card" | "list" | "gallery";

export enum SortType {
  trend = "trend",
  old = "old",
  new = "new",
}

type State = {
  articleViewMode: ViewMode;
  sortType: SortType;
  deleteArticleList: string[];
};

type Action = {
  changeViewMode: (mode: ViewMode) => void;
  changeSortType: (newSortType: SortType) => void;
  addToDeleteArticleList: (id: string) => void;
  removeFromDeleteArticleList: (id: string) => void;
  resetDeleteArticleList: () => void;
};

const useArticleStoreBase = create<State & Action>((set) => ({
  articleViewMode: "card",
  sortType: SortType.trend,
  deleteArticleList: [],
  changeViewMode: (mode) => set(() => ({ articleViewMode: mode })),
  changeSortType: (newSortType) => set(() => ({ sortType: newSortType })),
  addToDeleteArticleList: (id) =>
    set((state) => ({
      deleteArticleList: [...state.deleteArticleList, id],
    })),
  removeFromDeleteArticleList: (id) =>
    set((state) => ({
      deleteArticleList: state.deleteArticleList.filter(
        (articleId) => articleId !== id
      ),
    })),
  resetDeleteArticleList: () => set({ deleteArticleList: [] }),
}));

const useArticleStore = createSelectors(useArticleStoreBase);

export default useArticleStore;
