// TODO: Context to Zustand
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type State = {
  overlayMap: Map<string, React.ReactNode>;
};

type Action = {
  mount: (id: string, element: React.ReactNode | null) => void;
  unmount: (id: string) => void;
};

const useOverlayStore = create<State & Action>()(
  devtools((set) => ({
    overlayMap: new Map(),
    mount: (id, element) =>
      set((state) => {
        const clone = new Map(state.overlayMap);
        clone.set(id, element);

        return {
          overlayMap: clone,
        };
      }),
    unmount: (id) =>
      set((state) => {
        const clone = new Map(state.overlayMap);
        clone.delete(id);

        return {
          overlayMap: clone,
        };
      }),
  }))
);

export default useOverlayStore;
