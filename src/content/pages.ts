/**
 * Dutch SEO pages (services, case studies, articles). One entry = one route.
 * Shared by the router, the build-time prerender and the sitemap, so a page
 * added here is automatically routed, prerendered and listed.
 */

export type Block =
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'table'; head: string[]; rows: string[][] };

export type Section = { h2: string; blocks: Block[] };

export type ContentPage = {
  path: string;
  kind: 'service' | 'case' | 'article';
  /** <title> — keyword first, brand last */
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  /** Screenshot / clip under the intro (case studies) */
  media?: { img: string; video?: boolean; url: string };
  sections: Section[];
  faq?: { q: string; a: string }[];
  /** Related internal links shown at the bottom */
  related: string[];
  updated: string;
};

const CTA_NOTE = 'Btw niet van toepassing (kleine onderneming, vrijstellingsregeling).';

export const PAGES: ContentPage[] = [
  // ─── Services ────────────────────────────────────────────────────────────
  {
    path: '/website-laten-maken',
    kind: 'service',
    title: 'Website laten maken in Gent en Oost-Vlaanderen | ttrim.studio',
    description:
      'Een snelle, moderne website op maat voor je zaak, vanaf €475. Ontwerp, bouw, hosting en onderhoud door Trim Tahirsylaj uit Evergem.',
    eyebrow: 'Diensten · Website',
    h1: 'Website laten maken',
    intro:
      'Ik ontwerp en bouw websites op maat voor zelfstandigen en kmo’s in Gent en Oost-Vlaanderen: snel, mobielvriendelijk en klaar om klanten binnen te halen. Vanaf €475, of met een abonnement vanaf €195 opstart.',
    sections: [
      {
        h2: 'Wat je krijgt',
        blocks: [
          {
            type: 'list',
            items: [
              'Een ontwerp op maat, geen standaardsjabloon',
              'Responsive: perfect leesbaar op gsm, tablet en computer',
              'Een SEO-vriendelijke structuur, zodat Google je pagina’s begrijpt',
              'Contactformulier of WhatsApp-knop, zodat klanten je meteen bereiken',
              'Snelle laadtijd en een veilige HTTPS-verbinding',
            ],
          },
        ],
      },
      {
        h2: 'Prijzen',
        blocks: [
          { type: 'p', text: 'Je kiest voor een eenmalige aankoop, of voor een abonnement met een lagere opstartprijs waarin het Growth-onderhoud al zit.' },
          {
            type: 'table',
            head: ['Pakket', 'Omvang', 'Eenmalig', 'Abonnement'],
            rows: [
              ['Starter', '1 pagina', '€475', '€195 + €54/maand'],
              ['Advanced', "Tot 5 pagina's + CMS", '€1.150', '€385 + €69/maand'],
              ['Premium', "5+ pagina's, CMS, database", 'vanaf €2.350', '€785 + €115/maand'],
            ],
          },
          { type: 'p', text: CTA_NOTE },
        ],
      },
      {
        h2: 'Zo werken we samen',
        blocks: [
          {
            type: 'list',
            items: [
              'Kennismaking: je vertelt wat je zaak doet en wie je klanten zijn.',
              'Offerte: een duidelijke prijs vooraf, zonder verrassingen.',
              'Ontwerp en bouw: je ziet de site groeien en geeft feedback.',
              'Lancering: de site gaat online op je eigen domeinnaam.',
              'Onderhoud: met Care of Growth blijft alles veilig en up-to-date.',
            ],
          },
        ],
      },
    ],
    faq: [
      { q: 'Wat kost een website laten maken?', a: 'Bij mij vanaf €475 voor een website van één pagina, €1.150 tot 5 pagina’s en vanaf €2.350 voor grotere sites met CMS en database. Btw is niet van toepassing.' },
      { q: 'Is de website van mij?', a: 'Bij een eenmalige aankoop ben je vanaf dag één eigenaar van de volledige broncode.' },
      { q: 'Werk je alleen in Gent?', a: 'Ik zit in Evergem en werk vooral voor zaken in Gent en Oost-Vlaanderen, maar samenwerken kan in heel Vlaanderen.' },
    ],
    related: ['/realisaties/detailing-bros', '/realisaties/a-poppa', '/blog/wat-kost-een-website-laten-maken', '/pricing'],
    updated: '2026-11-04',
  },
  {
    path: '/automatisatie',
    kind: 'service',
    title: 'Bedrijfsprocessen automatiseren voor kmo’s | ttrim.studio',
    description:
      'Minder handwerk: e-mail, formulieren en CRM automatisch gekoppeld, vanaf €575. Ook AI-chatbots op maat. Trim Tahirsylaj, Evergem.',
    eyebrow: 'Diensten · Automatisatie',
    h1: 'Automatisatie voor je zaak',
    intro:
      'Herhaal je elke week dezelfde taken? Ik koppel je formulieren, e-mail, agenda en CRM zodat ze vanzelf samenwerken. Vanaf €575, meestal binnen enkele dagen klaar.',
    sections: [
      {
        h2: 'Wat ik voor je automatiseer',
        blocks: [
          {
            type: 'list',
            items: [
              'Aanvragen via je website komen meteen in je mailbox, agenda of CRM',
              'Automatische bevestigingsmails en opvolging van offertes',
              'Gegevens die je nu overtypt van het ene programma naar het andere',
              'Een AI-chatbot of assistent die vragen van klanten beantwoordt (vanaf €1.475)',
            ],
          },
          { type: 'p', text: 'Ik werk met n8n, een flexibel automatisatieplatform. Zo zit je niet vast aan dure maandabonnementen per koppeling.' },
        ],
      },
      {
        h2: 'Een voorbeeld',
        blocks: [
          { type: 'p', text: 'Op deze website vult een bezoeker de offertecalculator in. De aanvraag gaat automatisch naar mijn systeem, met het gekozen pakket, de opties en de richtprijs. Geen enkele aanvraag gaat verloren en ik hoef niets over te typen.' },
        ],
      },
      {
        h2: 'Prijzen',
        blocks: [
          {
            type: 'table',
            head: ['Dienst', 'Prijs'],
            rows: [
              ['Automatisatie (e-mail, formulieren, CRM)', 'vanaf €575'],
              ['Chatbot of AI-assistent', 'vanaf €1.475'],
            ],
          },
          { type: 'p', text: CTA_NOTE },
        ],
      },
    ],
    faq: [
      { q: 'Wat kost een automatisatie?', a: 'Vanaf €575 voor een koppeling tussen je formulieren, e-mail en CRM. Een AI-chatbot start vanaf €1.475.' },
      { q: 'Moet ik nieuwe software kopen?', a: 'Meestal niet. Ik koppel de programma’s die je al gebruikt.' },
    ],
    related: ['/website-laten-maken', '/app-laten-ontwikkelen', '/pricing'],
    updated: '2026-11-04',
  },
  {
    path: '/app-laten-ontwikkelen',
    kind: 'service',
    title: 'App laten ontwikkelen voor iPhone | ttrim.studio',
    description:
      'Een eigen iPhone-app, van idee tot App Store. Gebouwd door de maker van Owlog, een trading journal die live staat in de App Store.',
    eyebrow: 'Diensten · App',
    h1: 'App laten ontwikkelen',
    intro:
      'Ik ontwikkel iPhone-apps van idee tot publicatie in de App Store. Mijn eigen app Owlog, een trading journal, staat live in de App Store: ik ken dus het hele traject, ook de goedkeuring door Apple.',
    sections: [
      {
        h2: 'Wat je krijgt',
        blocks: [
          {
            type: 'list',
            items: [
              'Een native iPhone-app met een ontwerp op maat',
              'Publicatie in de App Store, inclusief de goedkeuringsprocedure',
              'Optioneel: abonnementen of aankopen in de app',
              'Updates en onderhoud na de lancering',
            ],
          },
        ],
      },
      {
        h2: 'Bewijs: Owlog',
        blocks: [
          { type: 'p', text: 'Owlog helpt traders hun trades bij te houden en patronen te herkennen, met statistieken en grafieken. De app heeft een gratis versie en een Pro-abonnement via de App Store.' },
        ],
      },
      {
        h2: 'Prijs',
        blocks: [
          { type: 'p', text: 'Elke app is anders. Je krijgt een offerte op maat na een korte kennismaking. ' + CTA_NOTE },
        ],
      },
    ],
    faq: [
      { q: 'Wat kost een app laten ontwikkelen?', a: 'Dat hangt af van de functies. Na een gesprek krijg je een vaste offerte, zodat je vooraf weet waar je aan toe bent.' },
      { q: 'Kan de app ook op Android?', a: 'Mijn specialiteit is iPhone. Heb je ook Android nodig, dan bespreken we samen de beste aanpak.' },
    ],
    related: ['/owlog', '/automatisatie', '/website-laten-maken'],
    updated: '2026-11-04',
  },

  // ─── Case studies ────────────────────────────────────────────────────────
  {
    path: '/realisaties/detailing-bros',
    kind: 'case',
    title: 'Detailing Bros: website voor car detailing in Evergem | ttrim.studio',
    description: 'Realisatie: een premium website met boekingen en prijzen voor Detailing Bros, car detailing in Evergem.',
    eyebrow: 'Realisatie · Car detailing',
    h1: 'Detailing Bros',
    intro: 'Een website voor Detailing Bros, een car-detailingzaak in Evergem: reiniging, herstel en bescherming van auto’s, in de werkplaats of bij de klant thuis.',
    media: { img: 'detailingbros', url: 'detailingbros.be' },
    sections: [
      {
        h2: 'De opdracht',
        blocks: [{ type: 'p', text: 'De zaak wilde een uitstraling die past bij premium werk aan dure wagens, en een snelle manier voor klanten om een offerte te vragen.' }],
      },
      {
        h2: 'Wat ik bouwde',
        blocks: [
          {
            type: 'list',
            items: [
              'Een heldere, rustige homepage met de boodschap meteen bovenaan: reiniging, herstel en bescherming',
              'De Google-score en reviews zichtbaar op de homepage, als bewijs voor nieuwe klanten',
              'Duidelijke knoppen voor offerte aanvragen en prijzen bekijken, en het telefoonnummer altijd in beeld',
              'Pagina’s voor de diensten, de prijzen en een blog',
            ],
          },
        ],
      },
    ],
    related: ['/website-laten-maken', '/realisaties/pizza-truck-herri'],
    updated: '2026-11-04',
  },
  {
    path: '/realisaties/pizza-truck-herri',
    kind: 'case',
    title: 'Pizza Truck Herri: website voor pizzatruck en catering | ttrim.studio',
    description: 'Realisatie: website voor Pizza Truck Herri, met menu, catering en offerteaanvragen voor evenementen.',
    eyebrow: 'Realisatie · Food truck',
    h1: 'Pizza Truck Herri',
    intro: 'Een website voor Pizza Truck Herri: authentieke pizza uit een mobiele oven, voor feesten, bedrijfsevents en catering.',
    media: { img: 'pizzatruckherri', url: 'pizzatruckherri.com' },
    sections: [
      {
        h2: 'De opdracht',
        blocks: [{ type: 'p', text: 'Klanten moesten in een paar seconden zien wat Herri aanbiedt en meteen een offerte kunnen vragen voor hun evenement.' }],
      },
      {
        h2: 'Wat ik bouwde',
        blocks: [
          {
            type: 'list',
            items: [
              'Een homepage met een sfeerfoto van de verlichte pizzatruck bij nacht',
              'Een vaste balk “Vraag een offerte aan” bovenaan elke pagina, en een infobalk voor grotere bestellingen',
              'Pagina’s voor het pizzamenu, catering en events, en foto’s',
              'Een WhatsApp-knop om de zaak direct te contacteren',
            ],
          },
        ],
      },
    ],
    related: ['/website-laten-maken', '/realisaties/a-poppa'],
    updated: '2026-11-04',
  },
  {
    path: '/realisaties/a-poppa',
    kind: 'case',
    title: 'A Poppa: website voor Italiaans restaurant in Gent | ttrim.studio',
    description: 'Realisatie: website voor A Poppa, Italiaans restaurant in Gent, met menu, afhaal, galerij en reservaties.',
    eyebrow: 'Realisatie · Restaurant',
    h1: 'A Poppa',
    intro: 'Een elegante website voor A Poppa, een Italiaans restaurant in Gent: “een smaak van thuis”.',
    media: { img: 'apoppa', url: 'apoppa.com' },
    sections: [
      {
        h2: 'De opdracht',
        blocks: [{ type: 'p', text: 'Het restaurant wilde online dezelfde warme, verfijnde sfeer als in de zaak, en gasten makkelijk laten reserveren of afhalen.' }],
      },
      {
        h2: 'Wat ik bouwde',
        blocks: [
          {
            type: 'list',
            items: [
              'Een rustig, klassiek ontwerp met sfeerfoto’s van gerechten',
              'Knoppen voor reserveren, het menu, afhaal, route en bellen',
              'Een nieuwsbalk bovenaan voor uitzonderlijke sluitingsdagen',
            ],
          },
        ],
      },
    ],
    related: ['/website-laten-maken', '/realisaties/detailing-bros'],
    updated: '2026-11-04',
  },
  {
    path: '/realisaties/kantara-international',
    kind: 'case',
    title: 'Kantara International: B2B-website Europa–Afrika | ttrim.studio',
    description: 'Realisatie: B2B-portaal voor Kantara International, dat Europese fabrikanten verbindt met Afrikaanse markten.',
    eyebrow: 'Realisatie · B2B',
    h1: 'Kantara International',
    intro: 'Een B2B-website voor Kantara International, dat Europese fabrikanten helpt om de Afrikaanse markt te betreden.',
    media: { img: 'kantara-international', video: true, url: 'kantara-international.com' },
    sections: [
      {
        h2: 'De opdracht',
        blocks: [{ type: 'p', text: 'Een internationaal publiek moest meteen begrijpen wat Kantara doet en vertrouwen krijgen in een partner voor markttoegang en regelgeving.' }],
      },
      {
        h2: 'Wat ik bouwde',
        blocks: [
          {
            type: 'list',
            items: [
              'Een openingsbeeld met een brug tussen twee werelden, als symbool voor wat Kantara doet',
              'Een lichte, rustige stijl in goud- en natuurtinten, met een zwevende navigatie',
              'Pagina’s voor de diensten, het bedrijf en contact',
            ],
          },
        ],
      },
    ],
    related: ['/website-laten-maken', '/automatisatie'],
    updated: '2026-11-04',
  },

  // ─── Articles ────────────────────────────────────────────────────────────
  {
    path: '/blog/wat-kost-een-website-laten-maken',
    kind: 'article',
    title: 'Wat kost een website laten maken in België? (2026) | ttrim.studio',
    description:
      'Een website laten maken kost bij mij tussen €475 en €2.350+, of vanaf €195 met een abonnement. Zo zie je waar de prijs van afhangt.',
    eyebrow: 'Blog · Prijzen',
    h1: 'Wat kost een website laten maken in België?',
    intro:
      'Kort antwoord: bij mij kost een website tussen €475 (één pagina) en €2.350 of meer (grote site met CMS en database). Wil je minder in één keer betalen, dan start een abonnement vanaf €195 plus een maandbedrag. Hieronder lees je waar de prijs van afhangt.',
    sections: [
      {
        h2: 'Mijn prijzen op een rij',
        blocks: [
          {
            type: 'table',
            head: ['Pakket', 'Wat je krijgt', 'Eenmalig', 'Abonnement'],
            rows: [
              ['Starter', '1 pagina, responsive, contactformulier', '€475', '€195 + €54/maand'],
              ['Advanced', "Tot 5 pagina's + CMS", '€1.150', '€385 + €69/maand'],
              ['Premium', "5+ pagina's, CMS, database, animaties", 'vanaf €2.350', '€785 + €115/maand'],
            ],
          },
          { type: 'p', text: CTA_NOTE },
        ],
      },
      {
        h2: 'Waar hangt de prijs van af?',
        blocks: [
          {
            type: 'list',
            items: [
              "Het aantal pagina's: een one-pager is sneller klaar dan een site met tien pagina's.",
              'Of je zelf teksten wil aanpassen: dan heb je een CMS nodig.',
              'Extra functies: een database, een klantenlogin, automatische koppelingen of een chatbot.',
              'Meertaligheid: elke extra taal kost bij mij €195.',
              'Het ontwerp: een uniek ontwerp met animaties vraagt meer werk dan een eenvoudige opmaak.',
            ],
          },
        ],
      },
      {
        h2: 'Eenmalig of abonnement?',
        blocks: [
          { type: 'p', text: 'Bij een eenmalige aankoop betaal je de volledige prijs en ben je eigenaar van de code. Daarna kies je zelf voor onderhoud: Care (€24/maand) of Growth (€54/maand).' },
          { type: 'p', text: 'Met een abonnement betaal je een lagere opstartprijs en een vast maandbedrag. Het Growth-onderhoud zit er dan al in: hosting, aanpassingen tot een uur per maand, een maandelijks Google-rapport en SEO-advies.' },
        ],
      },
      {
        h2: 'Vergeet de vaste kosten niet',
        blocks: [
          { type: 'p', text: 'Een website heeft ook doorlopende kosten: je domeinnaam, hosting, een SSL-certificaat en updates. Bij Care en Growth zitten hosting, SSL en updates inbegrepen. Je domeinnaam blijft op jouw naam.' },
        ],
      },
    ],
    faq: [
      { q: 'Is een goedkope website een goed idee?', a: 'Een goedkope sjabloon kan volstaan om te starten. Wil je dat klanten je vinden en contact opnemen, dan loont een snelle site op maat met een duidelijke structuur.' },
      { q: 'Komt er btw bij?', a: 'Nee. Ik werk onder de vrijstellingsregeling voor kleine ondernemingen, dus de prijzen zijn de prijzen die je betaalt.' },
    ],
    related: ['/website-laten-maken', '/pricing', '/automatisatie'],
    updated: '2026-11-04',
  },
];

export const pageByPath = (path: string) => PAGES.find((p) => p.path === path);

/** Short labels for internal links */
export const LINK_LABELS: Record<string, string> = {
  '/website-laten-maken': 'Website laten maken',
  '/automatisatie': 'Automatisatie',
  '/app-laten-ontwikkelen': 'App laten ontwikkelen',
  '/realisaties/detailing-bros': 'Realisatie: Detailing Bros',
  '/realisaties/pizza-truck-herri': 'Realisatie: Pizza Truck Herri',
  '/realisaties/a-poppa': 'Realisatie: A Poppa',
  '/realisaties/kantara-international': 'Realisatie: Kantara International',
  '/blog/wat-kost-een-website-laten-maken': 'Wat kost een website laten maken?',
  '/pricing': 'Alle prijzen',
  '/owlog': 'Owlog',
};
