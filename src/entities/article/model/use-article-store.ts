import { create } from "zustand";

import { createSelectors } from "@/shared";
import { ArticleFilterType } from "../queries";

export type ViewMode = "card" | "list" | "gallery";

export enum SortType {
  trend = "trend",
  old = "old",
  new = "new",
}

type State = {
  filter: ArticleFilterType;
  articleViewMode: ViewMode;
  deleteArticleList: string[];
};

type Action = {
  setFilter: (newFilter: ArticleFilterType) => void;
  changeViewMode: (mode: ViewMode) => void;
  addToDeleteArticleList: (id: string) => void;
  removeFromDeleteArticleList: (id: string) => void;
  resetDeleteArticleList: () => void;
};

const useArticleStoreBase = create<State & Action>((set) => ({
  articleViewMode: "card",
  filter: {
    sortType: SortType.trend,
  },
  setFilter: (newFilter) =>
    set((state) => ({
      filter: { ...state.filter, ...newFilter },
    })),
  deleteArticleList: [],
  changeViewMode: (mode) => set(() => ({ articleViewMode: mode })),
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
