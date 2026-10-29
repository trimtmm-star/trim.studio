import { StrictMode, useLayoutEffect, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import App from './App.tsx';
const PricingPage = lazy(() => import('./pages/PricingPage.tsx'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage.tsx'));
const OwlogPage = lazy(() => import('./pages/OwlogPage.tsx'));
const OwlogLegalPage = lazy(() => import('./pages/OwlogLegalPage.tsx'));
const CardPage = lazy(() => import('./pages/CardPage.tsx'));
import CookieConsent from './components/CookieConsent.tsx';
// Inter is self-hosted (no request to Google Fonts)
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import '@fontsource/inter/900.css';
import './index.css';

// Opening another page (e.g. Pricing) always starts at its top.
function ScrollToTop() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen" />}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/owlog" element={<OwlogPage />} />
        <Route path="/owlog/:doc" element={<OwlogLegalPage />} />
        <Route path="/card" element={<CardPage />} />
      </Routes>
      </Suspense>
      <CookieConsent />
    </BrowserRouter>
  </StrictMode>,
);
