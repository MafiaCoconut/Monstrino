import './index.css'
import App from './App.tsx'
import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { createApi } from './shared/api/http.ts';
import './i18n.ts';
import UserStore from './entities/user/UserStore.ts';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { AppThemeProvider } from '@/app/providers/ThemeProvider';
import { ScrollToTop } from './shared/ui/components/ScrollToTop.tsx';


interface UserState {
  userStore: UserStore,
}

export const userStore = new UserStore();
export const Context = createContext<UserState>({
  userStore
})
export const api = createApi(userStore);

document.title = 'Monstrino';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Context.Provider value={{ userStore}}>
        <AppThemeProvider>
          <ScrollToTop />
          <App />
        </AppThemeProvider>
      </Context.Provider>
    </BrowserRouter>
  </React.StrictMode>
);
