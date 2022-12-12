import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { SelectedUserContextProvider } from './context/SelectedUserContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <SelectedUserContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SelectedUserContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
