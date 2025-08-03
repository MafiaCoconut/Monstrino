import './index.css'
import App from './App.tsx'
import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import UserStore from './modules/Auth/store/UserStore.ts';

interface UserState {
  userStore: UserStore,
}

export const userStore = new UserStore();
export const Context = createContext<UserState>({
  userStore
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
