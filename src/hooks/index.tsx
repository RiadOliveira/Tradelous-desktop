import React from 'react';
import { AuthContext } from './auth';
import { ModalContext } from './modal';
import { ToastContext } from './toast';

const ContextsProvider: React.FC = ({ children }) => (
  <AuthContext>
    <ToastContext>
      <ModalContext>{children}</ModalContext>
    </ToastContext>
  </AuthContext>
);

export default ContextsProvider;
