import React, { createContext, useState, useContext } from 'react';
import Toast from 'components/Toast';

interface IToastProps {
  isVisible: boolean;
  type?: 'info' | 'success' | 'error';
  text?: {
    main: string;
    sub: string;
  };
}

interface IToastContextData {
  toastProps: IToastProps;
  setToastProps: (toastProps: IToastProps) => void;
}

const toastContext = createContext<IToastContextData>({} as IToastContextData);

const ToastContext: React.FC = ({ children }) => {
  const [toastProps, setToastProps] = useState({
    isVisible: false,
  });

  return (
    <toastContext.Provider
      value={{
        toastProps,
        setToastProps,
      }}
    >
      {children}
      <Toast />
    </toastContext.Provider>
  );
};

const useToast = (): IToastContextData => useContext(toastContext);

export { ToastContext, useToast };
