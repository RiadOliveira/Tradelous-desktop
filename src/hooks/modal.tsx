import React, { createContext, useState, useContext, useCallback } from 'react';
import Modal from 'components/Modal';

interface IModalProps {
  isVisible: boolean;
  buttonsProps?: {
    first: {
      text: string;
      color: string;
      actionFunction: () => Promise<void>;
    };
    second: {
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
    isVisible: true,
  });

  const showModal = useCallback((props: Omit<IModalProps, 'isVisible'>) => {
    setModalProps({ ...props, isVisible: true });
  }, []);

  const hideModal = useCallback(
    () => setModalProps(props => ({ ...props, isVisible: false })),
    [],
  );

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
    </modalContext.Provider>
  );
};

const useModal = (): IModalContextData => useContext(modalContext);

export { ModalContext, useModal };
