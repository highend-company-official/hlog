import { create } from "zustand";

import { createSelectors } from "@/shared";
import { ArticleFilterType } from "../query";

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
}));

const useArticleStore = createSelectors(useArticleStoreBase);

export default useArticleStore;
