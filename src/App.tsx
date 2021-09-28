import React from 'react';
import ContextsProvider from 'hooks';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

const App: React.FC = () => (
  <ContextsProvider>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </ContextsProvider>
);

export default App;
