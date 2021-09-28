import React, { createContext, useState, useContext } from 'react';

interface IToastProps {
  isVisible: boolean;
  color: string;
}

interface IToastContextData {
  toastProps: IToastProps;
  setToastProps: (toastProps: IToastProps) => void;
}

const toastContext = createContext<IToastContextData>({} as IToastContextData);

const ToastContext: React.FC = ({ children }) => {
  const [toastProps, setToastProps] = useState({ isVisible: false, color: '' });

  return (
    <toastContext.Provider
      value={{
        toastProps,
        setToastProps,
      }}
    >
      {children}
    </toastContext.Provider>
  );
};

const useToast = (): IToastContextData => useContext(toastContext);

export { ToastContext, useToast };
