import { create } from "zustand";
import { generateRandomId } from "@/shared";
import React from "react";

type ModalType = {
  id: string;
  children: React.ReactNode;
};

type State = {
  modals: ModalType[];
};

type Action = {
  addModal: (newModal: Omit<ModalType, "id">) => void;
  removeModal: (id: string) => void;
  removeAllModal: () => void;
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
  removeAllModal: () => set(() => ({ modals: [] })),
}));

export default useModal;
