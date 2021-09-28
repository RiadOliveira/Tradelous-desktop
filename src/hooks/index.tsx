import React from 'react';
import { AuthContext } from './auth';
import { ToastContext } from './toast';

const ContextsProvider: React.FC = ({ children }) => (
  <AuthContext>
    <ToastContext>{children}</ToastContext>
  </AuthContext>
);

export default ContextsProvider;
