import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import AppRoutes, { type PageSet } from './AppRoutes';
import PricingPage from './pages/PricingPage';
import PrivacyPage from './pages/PrivacyPage';
import OwlogPage from './pages/OwlogPage';
import OwlogLegalPage from './pages/OwlogLegalPage';
import CardPage from './pages/CardPage';
import ContentPage from './pages/ContentPage';

export { ROUTES, SITE, LOCAL_BUSINESS } from './content/seo';
export { PAGES } from './content/pages';

// Same tree as the browser, with the pages loaded eagerly
const pages: PageSet = {
  Pricing: PricingPage,
  Privacy: PrivacyPage,
  Owlog: OwlogPage,
  OwlogLegal: OwlogLegalPage,
  Card: CardPage,
  Content: ContentPage,
};

/** Build-time render of one route to HTML (scripts/prerender.mjs). */
export function render(path: string): string {
  return renderToString(
    <StaticRouter location={path}>
      <AppRoutes pages={pages} />
    </StaticRouter>,
  );
}
