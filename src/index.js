import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store'; // Adjust the path as necessary
import { AuthProvider } from './components/AuthContext';
import { UserActionsProvider } from './components/UserActionsContext';

const container = document.getElementById('root');
const root = createRoot(container); // Create a root.

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
      <UserActionsProvider>
        <App />
      </UserActionsProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);


