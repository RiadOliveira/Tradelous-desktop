import React, { createContext, useState, useContext, useCallback } from 'react';
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
  showToast: (toastProps: Omit<IToastProps, 'isVisible'>) => void;
  hideToast: () => void;
}

const toastContext = createContext<IToastContextData>({} as IToastContextData);

const ToastContext: React.FC = ({ children }) => {
  const [toastProps, setToastProps] = useState<IToastProps>({
    isVisible: false,
  });

  const showToast = useCallback((props: Omit<IToastProps, 'isVisible'>) => {
    setToastProps({ ...props, isVisible: true });
  }, []);

  const hideToast = useCallback(
    () => setToastProps(props => ({ ...props, isVisible: false })),
    [],
  );

  return (
    <toastContext.Provider
      value={{
        toastProps,
        showToast,
        hideToast,
      }}
    >
      {children}
      <Toast />
    </toastContext.Provider>
  );
};

const useToast = (): IToastContextData => useContext(toastContext);

export { ToastContext, useToast };
