import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import UserCollectionsPage from './pages/user/collections/UserCollectionsPage';
import { PrivacyPage } from './pages/static/privacy';
import { NotFoundPage } from './pages/static/not-found';
import HomePage from './pages/release-hub/Homepage';
import ReleasePage from './pages/release-hub/Index/ReleaseIndex';
import CharacterPageV2 from './pages/release-hub/Index/CharacterIndex';
import ReleaseCatalog from './pages/release-hub/Catalog/ReleaseCatalog';
import CharacterCatalog from './pages/release-hub/Catalog/CharacterCatalog';
import PetsCatalog from './pages/release-hub/Catalog/PetCatalog';
import SeriesCatalog from './pages/release-hub/Catalog/SeriesCatalog';
import CatalogLayout from './pages/release-hub/Layout/CatalogLayout';
import PetIndex from './pages/release-hub/Index/PetIndex';
import MonsterHighSeriesPage from './pages/release-hub/Index/SeriesIndex';
import HubLayout from './pages/release-hub/Layout/HubLayout';
import MainInfo from './pages/release-hub/Info/MainInfo';
import AboutInfo from './pages/release-hub/Info/AboutInfo';
import SupportInfo from './pages/release-hub/Info/SupportInfo';
import TermsInfo from './pages/release-hub/Info/TermsInfo';
import ContactInfo from './pages/release-hub/Info/ContactInfo';
import ImpressumInfo from './pages/release-hub/Info/ImpressumInfo';
import { DemoBadge } from '@/shared/ui/demo-badge';
import MonstrinoLayout from './pages/release-hub/Layout/InfoLayout';

function App() {
  return (
    <>
      <Routes>
        <Route path="collections" element={<UserCollectionsPage />} />

        <Route element={<CatalogLayout />}>
          <Route path='/catalog/r' element={<ReleaseCatalog />} />
          <Route path='/catalog/r/:internal_id' element={<ReleasePage />} />
          <Route path='/catalog/c' element={<CharacterCatalog />} />
          <Route path='/catalog/c/:internal_id' element={<CharacterPageV2 />} />
          <Route path='/catalog/p' element={<PetsCatalog />} />
          <Route path='/catalog/p/:internal_id' element={<PetIndex />} />
          <Route path='/catalog/s' element={<SeriesCatalog />} />
          <Route path='/catalog/s/:internal_id' element={<MonsterHighSeriesPage />} />
        </Route>

        <Route element={<HubLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/p/:id' element={<PetIndex />} />
          <Route path='/s/:id' element={<MonsterHighSeriesPage />} />
        </Route>

        {/* Static pages */}
        <Route path="/info" element={<MonstrinoLayout />}>
          <Route index element={<MainInfo />} />
          <Route path="about" element={<AboutInfo />} />
          <Route path="support" element={<SupportInfo />} />
          <Route path="contact" element={<ContactInfo />} />
          <Route path="terms" element={<Navigate to="/legal/terms" replace />} />
          <Route path="privacy" element={<Navigate to="/legal/privacy" replace />} />
          <Route path="impressum" element={<Navigate to="/legal/impressum" replace />} />
        </Route>
        <Route path="/legal" element={<MonstrinoLayout />}>
          <Route index element={<MainInfo />} />
          <Route path="terms" element={<TermsInfo />} />
          <Route path="impressum" element={<ImpressumInfo />} />
          <Route path="privacy" element={<PrivacyPage />} />
        </Route>

        {/* 404 - Catch all unmatched routes */}
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
      <DemoBadge />
    </>
  )

}

export default App
