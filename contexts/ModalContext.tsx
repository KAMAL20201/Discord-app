"use client";

import { Server } from "@prisma/client";
import { createContext, useContext, useState } from "react";

export type ModalType = "createServer" | "invite" | "editServer" | 'members';

interface ModalData {
  server?: Server;
}
interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}
const initialModalState: ModalStore = {
  type: null,
  data: {},
  isOpen: false,
  onOpen: () => {},
  onClose: () => {},
};

const ModalContext = createContext<ModalStore>(initialModalState);

export const ModalProviderWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [modalState, setModalState] = useState<ModalStore>(initialModalState);

  const handleOpen = (type: ModalType, data: ModalData = {}) => {
    setModalState({ ...modalState, type, isOpen: true, data });
  };

  const handleClose = () => {
    setModalState({ ...modalState, type: null, isOpen: false });
  };

  return (
    <ModalContext.Provider
      value={{ ...modalState, onOpen: handleOpen, onClose: handleClose }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  return useContext(ModalContext);
};
