import { Fragment, Suspense, useLayoutEffect, type ComponentType } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import App from './App';
import CookieConsent from './components/CookieConsent';
import { PAGES } from './content/pages';

/**
 * The route tree, shared by the browser (lazy pages) and the build-time
 * prerender (the same pages, loaded eagerly). Keeping one tree is what lets
 * the browser hydrate the prerendered HTML instead of rebuilding it.
 */
export type PageSet = {
  Pricing: ComponentType;
  Privacy: ComponentType;
  Owlog: ComponentType;
  OwlogLegal: ComponentType;
  Card: ComponentType;
  Content: ComponentType;
};

// Opening another page (e.g. Pricing) always starts at its top.
function ScrollToTop() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export default function AppRoutes({ pages: P }: { pages: PageSet }) {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen" />}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/pricing" element={<P.Pricing />} />
          <Route path="/privacy" element={<P.Privacy />} />
          <Route path="/owlog" element={<P.Owlog />} />
          <Route path="/owlog/:doc" element={<P.OwlogLegal />} />
          <Route path="/card" element={<P.Card />} />
          {PAGES.map((p) => <Fragment key={p.path}><Route path={p.path} element={<P.Content />} /></Fragment>)}
        </Routes>
      </Suspense>
      <CookieConsent />
    </>
  );
}
