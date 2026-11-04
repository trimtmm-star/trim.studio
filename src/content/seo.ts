import { PAGES } from './pages';

/** Head data for every indexable route; used by the prerender and the sitemap. */
export const SITE = 'https://ttrim.studio';

export type RouteMeta = { path: string; title: string; description: string; priority: number };

export const ROUTES: RouteMeta[] = [
  {
    path: '/',
    title: 'Trim Tahirsylaj — Websites, apps en automatisatie | ttrim.studio',
    description:
      'Websites op maat, iPhone-apps en automatisatie voor zelfstandigen en kmo’s in Gent en Oost-Vlaanderen. Bekijk mijn realisaties en prijzen.',
    priority: 1,
  },
  {
    path: '/pricing',
    title: 'Prijzen website laten maken: pakketten vanaf €475 | ttrim.studio',
    description:
      'Transparante prijzen: Starter €475, Advanced €1.150, Premium vanaf €2.350, of een abonnement. Onderhoud Care €24 en Growth €54 per maand.',
    priority: 0.9,
  },
  {
    path: '/owlog',
    title: 'Owlog — Trading journal voor iPhone',
    description: 'Owlog is een trading journal voor iPhone: houd je trades bij, bekijk statistieken en herken je patronen.',
    priority: 0.6,
  },
  {
    path: '/privacy',
    title: 'Privacy & cookies | ttrim.studio',
    description: 'Hoe ttrim.studio omgaat met je gegevens en cookies.',
    priority: 0.2,
  },
  ...PAGES.map((p) => ({
    path: p.path,
    title: p.title,
    description: p.description,
    priority: p.kind === 'service' ? 0.9 : p.kind === 'article' ? 0.7 : 0.6,
  })),
];

/** Organization data, on every page */
export const LOCAL_BUSINESS = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'ttrim.studio',
  alternateName: 'Trim Tahirsylaj',
  url: SITE,
  logo: 'https://i.postimg.cc/J0N6nT4h/LO.png',
  image: `${SITE}/work/detailingbros.webp`,
  telephone: '+32451130597',
  email: 'trimtmm@gmail.com',
  vatID: 'BE1036404220',
  priceRange: '€€',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Schoonstraat 175A',
    postalCode: '9940',
    addressLocality: 'Evergem',
    addressRegion: 'Oost-Vlaanderen',
    addressCountry: 'BE',
  },
  areaServed: ['Gent', 'Evergem', 'Oost-Vlaanderen', 'Vlaanderen'],
  knowsAbout: ['Webdesign', 'Website laten maken', 'Automatisatie', 'iOS-apps'],
};
