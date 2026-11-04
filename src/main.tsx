import { StrictMode, lazy } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes, { type PageSet } from './AppRoutes';
// Inter is self-hosted (no request to Google Fonts)
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import '@fontsource/inter/900.css';
import './index.css';

const pages: PageSet = {
  Pricing: lazy(() => import('./pages/PricingPage.tsx')),
  Privacy: lazy(() => import('./pages/PrivacyPage.tsx')),
  Owlog: lazy(() => import('./pages/OwlogPage.tsx')),
  OwlogLegal: lazy(() => import('./pages/OwlogLegalPage.tsx')),
  Card: lazy(() => import('./pages/CardPage.tsx')),
  Content: lazy(() => import('./pages/ContentPage.tsx')),
};

const app = (
  <StrictMode>
    <BrowserRouter>
      <AppRoutes pages={pages} />
    </BrowserRouter>
  </StrictMode>
);

// Prerendered pages already hold their HTML: hydrate it instead of
// rebuilding the page (faster, and no layout jump).
const root = document.getElementById('root')!;
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
