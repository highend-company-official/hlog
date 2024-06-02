import { create } from "zustand";
import { devtools } from "zustand/middleware";

type State = {
  query: string;
  isSearchOpen: boolean;
};

type Action = {
  setQuery: (input: string) => void;
  setIsSearchOpen: (open: boolean) => void;
  reset: () => void;
};

const initialState: State = {
  query: "",
  isSearchOpen: false,
};

const useSearchStore = create<State & Action>()(
  devtools((set) => ({
    ...initialState,
    setIsSearchOpen: (open) => set({ isSearchOpen: open }),
    setQuery: (input) => set({ query: input }),
    reset: () => set({ query: "" }),
  }))
);

export default useSearchStore;
