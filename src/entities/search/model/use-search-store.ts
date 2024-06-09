import { create } from "zustand";
import { devtools } from "zustand/middleware";

type Mode = "article" | "profile";

type State = {
  query: string;
  isSearchOpen: boolean;
  mode: Mode;
};

type Action = {
  setQuery: (input: string) => void;
  setIsSearchOpen: (open: boolean) => void;
  setMode: (newMode: Mode) => void;
  reset: () => void;
};

const initialState: State = {
  query: "",
  isSearchOpen: false,
  mode: "article",
};

const useSearchStore = create<State & Action>()(
  devtools((set) => ({
    ...initialState,
    setIsSearchOpen: (open) => set({ isSearchOpen: open }),
    setQuery: (input) => set({ query: input }),
    setMode: (newMode) => set({ mode: newMode }),
    reset: () => set({ query: "" }),
  }))
);

export default useSearchStore;
