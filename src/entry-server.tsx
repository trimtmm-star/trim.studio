import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from './App';
import PricingPage from './pages/PricingPage';
import { ContentView } from './pages/ContentPage';
import { pageByPath } from './content/pages';

export { ROUTES, SITE, LOCAL_BUSINESS } from './content/seo';
export { PAGES } from './content/pages';

/**
 * Build-time render of one route to HTML (scripts/prerender.mjs). Only the
 * pages with real text worth indexing are rendered; the rest keep the SPA
 * shell and get their head tags only.
 */
export function render(path: string): string | null {
  const content = pageByPath(path);
  const el = content ? <ContentView page={content} /> : path === '/' ? <App /> : path === '/pricing' ? <PricingPage /> : null;
  if (!el) return null;
  return renderToString(<StaticRouter location={path}>{el}</StaticRouter>);
}
