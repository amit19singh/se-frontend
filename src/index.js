import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store'; 
import { AuthProvider } from './context/AuthContext';
import { UserActionsProvider } from './context/UserActionsContext';
import { DarkModeContextProvider } from './context/DarkModeContext';

const container = document.getElementById('root');
const root = createRoot(container); 

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
      <UserActionsProvider>
      <DarkModeContextProvider>
        <App />
      </DarkModeContextProvider>
      </UserActionsProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);


