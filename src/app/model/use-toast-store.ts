import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type ToastType = {
  type: "success" | "warning" | "error";
  content: string;
  hasCloseButton?: boolean;
  staleTime?: number;
};

type State = {
  toastMap: Map<string, ToastType>;
};

type Action = {
  mount: (id: string, newToast: ToastType) => void;
  unmount: (id: string) => void;
};

const useToastStore = create<State & Action>()(
  devtools((set) => ({
    toastMap: new Map(),
    mount: (id, newToast) =>
      set((state) => {
        const clone = new Map(state.toastMap);
        clone.set(id, newToast);

        return {
          toastMap: clone,
        };
      }),
    unmount: (id) =>
      set((state) => {
        const clone = new Map(state.toastMap);
        clone.delete(id);

        return {
          toastMap: clone,
        };
      }),
  }))
);

export default useToastStore;
