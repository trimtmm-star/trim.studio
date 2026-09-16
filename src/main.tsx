import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import PricingPage from './pages/PricingPage.tsx';
import PrivacyPage from './pages/PrivacyPage.tsx';
import CookieConsent from './components/CookieConsent.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
      </Routes>
      <CookieConsent />
    </BrowserRouter>
  </StrictMode>,
);
