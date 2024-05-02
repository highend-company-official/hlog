import { create } from "zustand";
import { generateRandomId } from "@/shared";

type ModalType = {
  id: string;
  title: string;
  content: string;
};

type State = {
  modals: ModalType[];
};

type Action = {
  addModal: (newModal: Omit<ModalType, "id">) => void;
  removeModal: (id: string) => void;
};

const useModal = create<State & Action>((set) => ({
  modals: [],
  addModal: (modal) =>
    set((state) => ({
      modals: [...state.modals, { id: generateRandomId(), ...modal }],
    })),
  removeModal: (id) =>
    set((state) => ({
      modals: state.modals.filter((modal) => modal.id !== id),
    })),
}));

export default useModal;
