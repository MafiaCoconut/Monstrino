import { useState, useRef, useEffect, useContext } from 'react'
import './App.css'
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { } from 'react-router-dom';
// import Homepage from './features/homepage/Homepage';
import RegisterForm from './features/auth-register/ui/RegisterForm';
import LoginForm from './features/auth-login/ui/LoginForm';
import { Context } from './main';
import LandingPage from './pages/home/Homepage';
import MonstrinoProfilePage from './pages/user/profile/UserProfile';
import { ThemeProvider } from '@emotion/react';
import muiTheme from './shared/theme/muiTheme'
import { CssBaseline } from '@mui/material';
import UserCollectionsPage from './pages/user/collections/UserCollectionsPage';
import GroupsPage from './pages/user/groups/UserGroupsPage';
import FriendsPage from './pages/user/friends/UserFriendsPage';
import CollectionPage from './pages/user/collections/UserCollectionPage';
import { AboutPage } from '@/pages/static/about';
import { SettingsPage } from '@/pages/user/settings';
import { WishlistPage } from '@/pages/user/wishlist';
import { ContactPage } from './pages/static/contact';
import { PrivacyPage } from './pages/static/privacy';
import { SupportPage } from './pages/static/support';
import { TermsPage } from './pages/static/terms';
function App() {
  const { userStore } = useContext(Context);

  const didRun = useRef(false);
  // useEffect(() => {
  //   userStore.checkAuth();
  // }, [])
  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;
    // userStore.checkAuth();
  }, []);


  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/login" element={<LoginForm />} />

              <Route path="collections" element={<UserCollectionsPage />} />

              {/* Users pages */}
              <Route path="/users/:username">
                {/* /users/:username */}
                <Route index element={<MonstrinoProfilePage />} />
                {/* /users/:username/posts */}
                {/* <Route path="posts" element={<MonstrinoProfilePage />} /> */}
                {/* /users/:username/collections */}
                <Route path="collections" element={<UserCollectionsPage />} />
                {/* /users/:username/collections/:collectionId */}
                <Route path="collections/:collectionId" element={<CollectionPage />} />
                {/* /users/:username/friends */}
                <Route path="friends" element={<FriendsPage />} />
                {/* /users/:username/groups */}
                <Route path="groups" element={<GroupsPage />} />
                {/* /users/:username/wishlist */}
                <Route path="wishlist" element={<WishlistPage />} />

              </Route>

              {/* Static pages */}
              <Route path="/about"   element={<AboutPage   />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/terms"   element={<TermsPage   />} />
              
              <Route path="/settings" element={<SettingsPage />} />


              {/* Groups */}
              {/* <Route path="/users/-1/groups" element={<MonstrinoProfilePage />} />
              <Route path="/groups" element={<MonstrinoProfilePage />} />
              <Route path="/groups/:id" element={<MonstrinoProfilePage />} />
              <Route path="/users/-1/groups" element={<MonstrinoProfilePage />} />
              <Route path="/users/-1/groups" element={<MonstrinoProfilePage />} />
              <Route path="/users/-1/groups" element={<MonstrinoProfilePage />} />
              <Route path="/users/-1/groups" element={<MonstrinoProfilePage />} />
              <Route path="/users/-1/groups" element={<MonstrinoProfilePage />} />
              <Route path="/users/-1/groups" element={<MonstrinoProfilePage />} /> */}

              {/* <Route path="*" element={<NotFound />} /> */}
              <></>
            </Routes>
          </BrowserRouter>
        </div>
      </CssBaseline>
    </ThemeProvider>
  )

}

export default App
