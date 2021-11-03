import React, { createContext, useState, useContext, useCallback } from 'react';
import Modal from 'components/Modal';
import ModalInput from 'components/Modal/ModalInput';
import { useTransition } from 'react-spring';

interface IModalProps {
  isVisible: boolean;
  buttonsProps?: {
    first: {
      text: string;
      color: string;
      actionFunction: (inputText?: string) => void;
    };
    second?: {
      text: string;
      color: string;
      actionFunction: () => void;
    };
  };
  isSecureEntry?: boolean; // Used in Modals with input.
  text?: string;
  type: 'ordinary' | 'withInput';
}

interface IModalContextData {
  modalProps: Omit<IModalProps, 'isVisible'>;
  showModal: (ModalProps: Omit<IModalProps, 'isVisible'>) => void;
  hideModal: () => void;
}

const modalContext = createContext<IModalContextData>({} as IModalContextData);

const ModalContext: React.FC = ({ children }) => {
  const [modalProps, setModalProps] = useState<IModalProps>({
    isVisible: false,
    type: 'ordinary',
  });

  const showModal = useCallback((props: Omit<IModalProps, 'isVisible'>) => {
    setModalProps({ ...props, isVisible: true });
  }, []);

  const hideModal = useCallback(
    () => setModalProps({ isVisible: false, type: 'ordinary' }),
    [],
  );

  const modalTransition = useTransition(modalProps, {
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
      delay: 200,
    },
    leave: {
      opacity: 0,
    },
    config: {
      duration: 400,
    },
  });

  return (
    <modalContext.Provider
      value={{
        modalProps,
        showModal,
        hideModal,
      }}
    >
      {children}
      {modalTransition(
        (style, item) =>
          item.isVisible &&
          (item.type === 'ordinary' ? (
            <Modal style={style} />
          ) : (
            <ModalInput style={style} />
          )),
      )}
    </modalContext.Provider>
  );
};

const useModal = (): IModalContextData => useContext(modalContext);

export { ModalContext, useModal };
