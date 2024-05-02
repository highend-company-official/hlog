import { generateRandomId } from "@/shared";
import { create } from "zustand";

type ToastType = {
  id: string;
  type: "success" | "warning" | "error";
  content: string;
  hasCloseButton: boolean;
  staleTime?: number;
  // Domain 구현하기
};

type State = {
  toasts: ToastType[];
};

type Action = {
  addToast: (newToast: Omit<ToastType, "id">) => void;
  removeToast: (id: string) => void;
};

const useToast = create<State & Action>((set) => ({
  toasts: [],
  addToast: (toast) =>
    set((state) => ({
      toasts: [...state.toasts, { id: generateRandomId(), ...toast }],
    })),
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}));

export default useToast;
