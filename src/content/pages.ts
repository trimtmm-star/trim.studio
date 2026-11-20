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
      'Een snelle, moderne website op maat voor je zaak, vanaf €545. Ontwerp, bouw, hosting en onderhoud door Trim Tahirsylaj uit Evergem.',
    eyebrow: 'Diensten · Website',
    h1: 'Website laten maken',
    intro:
      'Ik ontwerp en bouw websites op maat voor zelfstandigen en kmo’s in Gent en Oost-Vlaanderen: snel, mobielvriendelijk en klaar om klanten binnen te halen. Vanaf €545, of met een abonnement vanaf €195 opstart.',
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
              ['Starter', '1 pagina', '€545', '€195 + €54/maand'],
              ['Advanced', "Tot 5 pagina's + CMS", '€1.290', '€385 + €69/maand'],
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
      { q: 'Wat kost een website laten maken?', a: 'Bij mij vanaf €545 voor een website van één pagina, €1.290 tot 5 pagina’s en vanaf €2.350 voor grotere sites met CMS en database. Btw is niet van toepassing.' },
      { q: 'Is de website van mij?', a: 'Bij een eenmalige aankoop ben je vanaf dag één eigenaar van de volledige broncode.' },
      { q: 'Werk je alleen in Gent?', a: 'Ik zit in Evergem en werk vooral voor zaken in Gent en Oost-Vlaanderen, maar samenwerken kan in heel Vlaanderen.' },
    ],
    related: ['/realisaties/tuinen-piens', '/realisaties/detailing-bros', '/blog/wat-kost-een-website-laten-maken', '/pricing'],
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
    path: '/realisaties/tuinen-piens',
    kind: 'case',
    title: 'Tuinen Piens: website voor tuinonderhoud in Gent | ttrim.studio',
    description: 'Realisatie: website voor Tuinen Piens, tuinman in Gent, met een voor-en-na foto die verandert terwijl je scrolt.',
    eyebrow: 'Realisatie · Tuinonderhoud',
    h1: 'Tuinen Piens',
    intro: 'Een website voor Tuinen Piens, het tuinbedrijf van Filip Piens uit Gent: tuinonderhoud, snoeien en vellen, afsluitingen, opritten en terrassen.',
    media: { img: 'tuinen-piens', video: true, url: 'tuinonderhoudgent.be' },
    sections: [
      {
        h2: 'De opdracht',
        blocks: [{ type: 'p', text: 'Bezoekers moesten in één oogopslag zien wat een goed onderhouden tuin oplevert, en meteen een offerte kunnen vragen.' }],
      },
      {
        h2: 'Wat ik bouwde',
        blocks: [
          {
            type: 'list',
            items: [
              'Een homepage met een grote voor-en-na foto: terwijl je scrolt verandert een verwaarloosde tuin in een strak gazon',
              'Duidelijke knoppen voor een offerte en de diensten, bovenaan de pagina',
              'De vier diensten duidelijk op een rij: tuinonderhoud, afsluitingen, snoeien en vellen, opritten en terrassen',
              'Een SEO-titel en -beschrijving gericht op tuinonderhoud in Gent en de regio',
            ],
          },
        ],
      },
    ],
    related: ['/website-laten-maken', '/realisaties/detailing-bros'],
    updated: '2026-11-19',
  },
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
      'Een website laten maken kost bij mij tussen €545 en €2.350+, of vanaf €195 met een abonnement. Zo zie je waar de prijs van afhangt.',
    eyebrow: 'Blog · Prijzen',
    h1: 'Wat kost een website laten maken in België?',
    intro:
      'Kort antwoord: bij mij kost een website tussen €545 (één pagina) en €2.350 of meer (grote site met CMS en database). Wil je minder in één keer betalen, dan start een abonnement vanaf €195 plus een maandbedrag. Hieronder lees je waar de prijs van afhangt.',
    sections: [
      {
        h2: 'Mijn prijzen op een rij',
        blocks: [
          {
            type: 'table',
            head: ['Pakket', 'Wat je krijgt', 'Eenmalig', 'Abonnement'],
            rows: [
              ['Starter', '1 pagina, responsive, contactformulier', '€545', '€195 + €54/maand'],
              ['Advanced', "Tot 5 pagina's + CMS", '€1.290', '€385 + €69/maand'],
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
  {
    path: '/blog/veelgestelde-vragen-website-laten-maken',
    kind: 'article',
    title: 'Website laten maken in Gent: veelgestelde vragen | ttrim.studio',
    description:
      'Antwoorden op de meest gestelde vragen over een website laten maken in Gent en Oost-Vlaanderen: kostprijs, doorlooptijd, eigendom, onderhoud, apps en automatisatie.',
    eyebrow: 'Blog · Veelgestelde vragen',
    h1: 'Website laten maken: veelgestelde vragen',
    intro:
      'Je overweegt een website voor je zaak in Gent, Evergem of Oost-Vlaanderen? Dit zijn de vragen die zelfstandigen en kmo’s me het vaakst stellen, met een eerlijk antwoord.',
    sections: [
      {
        h2: 'Voor wie bouw ik websites?',
        blocks: [{ type: 'p', text: 'Voor zelfstandigen en kmo’s in Gent, Evergem en Oost-Vlaanderen: aannemers, horeca, tuinbedrijven, dienstverleners en meer. Ik werk persoonlijk, van eerste gesprek tot oplevering.' }],
      },
      {
        h2: 'Hoe lang duurt het om een website te laten maken?',
        blocks: [{ type: 'p', text: 'Een eenvoudige website is meestal binnen enkele weken klaar. De planning start zodra de briefing en de inhoud binnen zijn, en je krijgt vooraf een duidelijke timing. Inbegrepen zijn twee revisierondes.' }],
      },
      {
        h2: 'Is mijn website na oplevering echt van mij?',
        blocks: [{ type: 'p', text: 'Bij een eenmalige aankoop wel: de website is volledig van jou vanaf dag 1, inclusief je domeinnaam. Bij een abonnement krijg je een gebruiksrecht, met de mogelijkheid om de website later over te nemen.' }],
      },
      {
        h2: 'Doe je ook onderhoud en hosting?',
        blocks: [{ type: 'p', text: 'Ja. Hosting, SSL, beveiliging, back-ups en updates zitten in het onderhoudsplan Care (€24/maand) of Growth (€54/maand). Bij een abonnement is Growth inbegrepen.' }],
      },
      {
        h2: 'Maak je ook apps, chatbots of automatisaties?',
        blocks: [{ type: 'p', text: 'Ja. Naast websites bouw ik iPhone-apps, chatbots en AI-assistenten, en automatiseer ik terugkerend werk zoals formulieren, e-mail en offertes.' }],
      },
    ],
    faq: [
      { q: 'Voor wie bouw je websites?', a: 'Voor zelfstandigen en kmo’s in Gent, Evergem en Oost-Vlaanderen: aannemers, horeca, tuinbedrijven, dienstverleners en meer.' },
      { q: 'Hoeveel kost een website?', a: 'Dat hangt af van het aantal pagina’s en de functies. Je kiest tussen een eenmalige prijs of een abonnement met lage opstartkost. Alle prijzen staan op de prijzenpagina.' },
      { q: 'Hoe lang duurt het om een website te laten maken?', a: 'Een eenvoudige website is meestal binnen enkele weken klaar. De planning start zodra de briefing en de inhoud binnen zijn.' },
      { q: 'Is mijn website na oplevering echt van mij?', a: 'Bij een eenmalige aankoop wel, volledig vanaf dag 1. Bij een abonnement krijg je een gebruiksrecht met de mogelijkheid om de website later over te nemen.' },
      { q: 'Doe je ook onderhoud en hosting?', a: 'Ja, via Care (€24/maand) of Growth (€54/maand). Bij een abonnement zit het onderhoud inbegrepen.' },
      { q: 'Maak je ook apps of automatisaties?', a: 'Ja: iPhone-apps, chatbots, AI-assistenten en automatisaties voor formulieren, e-mail en offertes.' },
    ],
    related: ['/website-laten-maken', '/pricing', '/blog/wat-kost-een-website-laten-maken'],
    updated: '2026-11-20',
  },
  {
    path: '/blog/website-laten-maken-gent',
    kind: 'article',
    title: 'Website laten maken in Gent: waar op letten? | ttrim.studio',
    description:
      'Een website laten maken in Gent of Oost-Vlaanderen? Dit zijn de 6 dingen waarop je best let: prijs, eigendom, snelheid, vindbaarheid, onderhoud en wie je aanspreekpunt is.',
    eyebrow: 'Blog · Gids',
    h1: 'Website laten maken in Gent: waar op letten?',
    intro:
      'Een website laten maken lijkt eenvoudig, tot je offertes naast elkaar legt en elk bedrijf iets anders belooft. Dit zijn de zes punten waarop je als zelfstandige of kmo in Gent en Oost-Vlaanderen best let, voor je tekent.',
    sections: [
      {
        h2: '1. Vraag wat de prijs precies omvat',
        blocks: [
          { type: 'p', text: 'Twee offertes kunnen er even goedkoop uitzien en toch niet hetzelfde bevatten. Check of hosting, je domeinnaam, SSL, een contactformulier en aanpassingen na de oplevering erin zitten. En kijk of de prijs met of zonder btw is: dat verschilt snel 21%.' },
          { type: 'p', text: 'Bij mij zijn de prijzen eindprijzen, omdat ik onder de vrijstellingsregeling voor kleine ondernemingen werk. Je vindt ze op de prijzenpagina.' },
        ],
      },
      {
        h2: '2. Wees zeker dat de website van jou is',
        blocks: [
          { type: 'p', text: 'Sommige bureaus houden de website in eigendom en verhuren hem aan je. Stop je, dan sta je met niets. Vraag dus uitdrukkelijk: wie is eigenaar van de code, van het ontwerp en van de domeinnaam?' },
          { type: 'p', text: 'Bij een eenmalige aankoop is de website bij mij volledig van jou. Bij een abonnement krijg je een gebruiksrecht, met de mogelijkheid om de website later over te nemen.' },
        ],
      },
      {
        h2: '3. Snelheid telt, vooral op je gsm',
        blocks: [
          { type: 'p', text: 'De meeste bezoekers komen via hun telefoon. Een trage website kost je klanten voor ze je aanbod gezien hebben, en Google houdt rekening met laadsnelheid. Test je huidige of voorgestelde website gratis met PageSpeed Insights en vraag naar de score op mobiel.' },
        ],
      },
      {
        h2: '4. Zorg dat klanten je ook vinden',
        blocks: [
          {
            type: 'list',
            items: [
              'Een duidelijke titel en beschrijving per pagina, met je activiteit en regio.',
              'Aparte pagina’s per dienst, zodat Google weet waarvoor je gevonden wil worden.',
              'Een Google Bedrijfsprofiel met je openingstijden, foto’s en reviews.',
              'Gestructureerde gegevens (zoals bedrijfsgegevens), zodat Google je correct toont.',
            ],
          },
        ],
      },
      {
        h2: '5. Wie houdt de website up-to-date?',
        blocks: [
          { type: 'p', text: 'Een website is nooit af. Software moet bijgewerkt worden, je openingsuren of prijzen veranderen, en een beveiligingsprobleem moet snel opgelost worden. Spreek dus vooraf af wie dat doet en wat het kost, bijvoorbeeld via een vast maandbedrag voor hosting en onderhoud.' },
        ],
      },
      {
        h2: '6. Wie is je aanspreekpunt?',
        blocks: [
          { type: 'p', text: 'Bij een grote speler praat je met een accountmanager die jouw verhaal doorgeeft aan een ontwerper en een ontwikkelaar. Bij een kleine studio spreek je rechtstreeks met de persoon die je website bouwt. Dat scheelt misverstanden, tijd en heen-en-weer mails.' },
        ],
      },
      {
        h2: 'Een voorbeeld uit de regio',
        blocks: [
          { type: 'p', text: 'Wil je zien hoe dat er in de praktijk uitziet? Bekijk de realisaties voor een tuinbedrijf uit Gent, een detailingbedrijf en een pizzatruck. Elke website is op maat gebouwd en werkt vlot op telefoon en computer.' },
        ],
      },
    ],
    faq: [
      { q: 'Wat kost een website laten maken in Gent?', a: 'Dat hangt af van het aantal pagina’s en de functies. Je kiest tussen een eenmalige prijs of een abonnement met lage opstartkost. Op de prijzenpagina zie je alle bedragen.' },
      { q: 'Is een lokale webdesigner beter dan een groot bureau?', a: 'Dat hangt van je project af. Een kleine, lokale studio werkt persoonlijk en direct, een groot bureau heeft meer capaciteit voor omvangrijke projecten.' },
      { q: 'Hoe vind ik klanten uit mijn regio via Google?', a: 'Combineer een snelle website met duidelijke dienstenpagina’s, een volledig Google Bedrijfsprofiel en reviews van tevreden klanten.' },
    ],
    related: ['/website-laten-maken', '/pricing', '/blog/wat-kost-een-website-laten-maken', '/blog/veelgestelde-vragen-website-laten-maken'],
    updated: '2026-11-20',
  },
];

export const pageByPath = (path: string) => PAGES.find((p) => p.path === path);

/** Short labels for internal links */
export const LINK_LABELS: Record<string, string> = {
  '/website-laten-maken': 'Website laten maken',
  '/automatisatie': 'Automatisatie',
  '/app-laten-ontwikkelen': 'App laten ontwikkelen',
  '/realisaties/tuinen-piens': 'Realisatie: Tuinen Piens',
  '/realisaties/detailing-bros': 'Realisatie: Detailing Bros',
  '/realisaties/pizza-truck-herri': 'Realisatie: Pizza Truck Herri',
  '/realisaties/a-poppa': 'Realisatie: A Poppa',
  '/realisaties/kantara-international': 'Realisatie: Kantara International',
  '/blog/wat-kost-een-website-laten-maken': 'Wat kost een website laten maken?',
  '/blog/veelgestelde-vragen-website-laten-maken': 'Veelgestelde vragen',
  '/blog/website-laten-maken-gent': 'Website laten maken in Gent: waar op letten?',
  '/pricing': 'Alle prijzen',
  '/owlog': 'Owlog',
};
