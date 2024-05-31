import { create } from "zustand";
import { devtools } from "zustand/middleware";

type State = {
  searchInput: string;
  isSearchOpen: boolean;
};

type Action = {
  setSearchInput: (input: string) => void;
  setIsSearchOpen: (open: boolean) => void;
};

const initialState: State = {
  searchInput: "",
  isSearchOpen: false,
};

const useSearchStore = create<State & Action>()(
  devtools((set) => ({
    ...initialState,
    setIsSearchOpen: (open) => set({ isSearchOpen: open }),
    setSearchInput: (input) => set({ searchInput: input }),
  }))
);

export default useSearchStore;
