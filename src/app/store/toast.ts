import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { generateRandomId } from "@/shared";

type ToastType = {
  id: string;
  type: "success" | "warning" | "error";
  content: string;
  hasCloseButton: boolean;
  staleTime?: number;
  //TODO: Domain 구현하기
};

type State = {
  toasts: ToastType[];
};

type Action = {
  addToast: (newToast: Omit<ToastType, "id">) => void;
  removeToast: (id: string) => void;
};

const toastStore = create<State & Action>()(
  devtools((set) => ({
    toasts: [],
    addToast: (toast: Omit<ToastType, "id">) =>
      set((state) => ({
        toasts: [...state.toasts, { id: generateRandomId(), ...toast }],
      })),
    removeToast: (id: string) =>
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id),
      })),
  }))
);

export default toastStore;
