import React, { createContext, useState, useContext, useCallback } from 'react';
import Modal from 'components/Modal';
import ModalInput from 'components/Modal/ModalInput';

interface IModalProps {
  isVisible: boolean;
  buttonsProps?: {
    first: {
      text: string;
      color: string;
      actionFunction: (inputText?: string) => Promise<void>; // In case Modal is with input
      isSecureEntry?: boolean;
    };
    second?: {
      // In case Modal is with input
      text: string;
      color: string;
      actionFunction: () => Promise<void>;
    };
  };
  text?: string;
}

interface IModalContextData {
  modalProps: IModalProps;
  showModal: (ModalProps: Omit<IModalProps, 'isVisible'>) => void;
  hideModal: () => void;
}

const modalContext = createContext<IModalContextData>({} as IModalContextData);

const ModalContext: React.FC = ({ children }) => {
  const [modalProps, setModalProps] = useState<IModalProps>({
    isVisible: false,
  });

  const showModal = useCallback((props: Omit<IModalProps, 'isVisible'>) => {
    setModalProps({ ...props, isVisible: true });
  }, []);

  const hideModal = useCallback(() => setModalProps({ isVisible: false }), []);

  return (
    <modalContext.Provider
      value={{
        modalProps,
        showModal,
        hideModal,
      }}
    >
      {children}
      <Modal />
      <ModalInput />
    </modalContext.Provider>
  );
};

const useModal = (): IModalContextData => useContext(modalContext);

export { ModalContext, useModal };
