import { useRef, useEffect, useContext } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';
// import Homepage from './features/homepage/Homepage';
// import RegisterForm from './features/auth-register/ui/RegisterForm';
// import LoginForm from './features/auth-login/ui/LoginForm';
import { Context } from './main';
import MonstrinoProfilePage from './pages/user/profile/UserProfile';
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
import { PublicLayout, UserLayout, ReleaseHubLayout } from './layouts';
import { Homepage } from '@/pages/home';
import { HomePage, ReleaseCatalogPage, ReleaseDetailPage } from '@/pages/release-hub';
import { ReleaseIndexPage } from '@/pages/release-index';
import { UserDollsPage } from './pages/user/dolls';

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
    <Routes>
      {/* <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} /> */}

      <Route path="collections" element={<UserCollectionsPage />} />

      {/* Users pages */}
      <Route path="/users/:username"            element={<UserLayout />}>
        <Route index                            element={<MonstrinoProfilePage />} />
        <Route path="posts"                     element={<MonstrinoProfilePage />} />
        <Route path="collections"               element={<UserCollectionsPage />} />
        <Route path="collection/:collectionId"  element={<CollectionPage />} />
        <Route path="dolls"                     element={<UserDollsPage />} />
        <Route path="friends"                   element={<FriendsPage />} />
        <Route path="groups"                    element={<GroupsPage />} />
        <Route path="wishlist"                  element={<WishlistPage />} />
      </Route>
      
      {/* Releases */}
      {/* <Route path='/releases' element={<ReleaseHubLayout />} /> */}
      <Route path='/releases' element={<ReleaseCatalogPage />} />
      {/* <Route path='/releases/:id' element={<ReleaseDetailPage />} /> */}
      <Route path='/release_p/' element={<ReleaseIndexPage />} />
      <Route path='/releases/home' element={<HomePage />} />
      
      {/* Static pages */}
      <Route path="/"           element={<PublicLayout />}>
        <Route index            element={<Homepage />} />
        <Route path="/about"    element={<AboutPage   />} />
        <Route path="/contact"  element={<ContactPage />} />
        <Route path="/privacy"  element={<PrivacyPage />} />
        <Route path="/support"  element={<SupportPage />} />
        <Route path="/terms"    element={<TermsPage   />} />
        
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

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
  )

}

export default App
