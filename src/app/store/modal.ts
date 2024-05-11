import { create } from "zustand";
import { generateRandomId } from "@/shared";
import React from "react";
import { devtools } from "zustand/middleware";

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

const useModalStore = create<State & Action>()(
  devtools((set) => ({
    modals: [],
    addModal: (newModal: Omit<ModalType, "id">) =>
      set((state) => ({
        modals: [...state.modals, { id: generateRandomId(), ...newModal }],
      })),
    removeModal: (id: string) =>
      set((state) => ({
        modals: state.modals.filter((modal) => modal.id !== id),
      })),
    removeAllModal: () => set(() => ({ modals: [] })),
  }))
);

export default useModalStore;
