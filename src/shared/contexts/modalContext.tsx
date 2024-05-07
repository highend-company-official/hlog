import { createContext, useContext, useState } from "react";

type ModalType = {
  modalId: string;
  isOpen: boolean;
};

type ModalContextType = [
  ModalType[],
  React.Dispatch<React.SetStateAction<ModalType[]>>
];

export const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const modalState = useState<ModalType[]>([]);

  return (
    <ModalContext.Provider value={modalState}>{children}</ModalContext.Provider>
  );
}

export const useModalContext = () => {
  const value = useContext(ModalContext) as ModalContextType;

  if (!value) {
    throw new Error(`ModalProvider 내에서 사용해야 합니다.`);
  }

  return value;
};
