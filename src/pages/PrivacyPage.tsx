import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import MeshBackground from '../components/MeshBackground';
import { openCookieSettings } from '../components/CookieConsent';

const UPDATED = '2026-09-16';

type Section = { h: string; p: (string | string[])[] };
type Copy = { back: string; title: string; updated: string; cookieBtn: string; sections: Section[]; cookies: { head: string[]; rows: string[][] } };

const copy: Record<'nl' | 'en', Copy> = {
  nl: {
    back: 'Terug naar home',
    title: 'Privacy- & cookiebeleid',
    updated: 'Laatst bijgewerkt',
    cookieBtn: 'Cookievoorkeuren wijzigen',
    sections: [
      { h: '1. Wie is verantwoordelijk', p: [
        'Trim Tahirsylaj (ttrim.studio), eenmanszaak, BTW BE1036404220, [adres in te vullen], België. E-mail: trimtmm@gmail.com. Ik ben de verwerkingsverantwoordelijke voor de gegevens die via deze website worden verzameld.',
      ]},
      { h: '2. Welke gegevens ik verzamel en waarom', p: [
        ['Contact via e-mail of WhatsApp — naam, e-mailadres of telefoonnummer en de inhoud van je bericht. Doel: je vraag beantwoorden en een eventuele offerte opmaken. Rechtsgrond: precontractuele maatregelen (art. 6.1.b AVG).',
         'Prijsconfigurator — naam, e-mailadres, gekozen pakket, opties, geschatte prijs en je opmerkingen. Deze worden via een beveiligde verbinding naar mijn eigen automatiseringsserver (n8n, gehost in de EU) gestuurd om je een voorstel te bezorgen. Rechtsgrond: precontractuele maatregelen (art. 6.1.b AVG).',
         'Statistieken (Google Analytics 4) — enkel na jouw toestemming via de cookiebanner: bezochte pagina\'s, apparaat, browser, land, verwijzende site, bij benadering gemaakte locatie. IP-adressen worden door Google geanonimiseerd. Doel: begrijpen hoe de site wordt gebruikt en hem verbeteren. Rechtsgrond: toestemming (art. 6.1.a AVG). Zonder toestemming worden geen analytics-cookies geplaatst; Google Consent Mode stuurt dan enkel cookieloze, niet-identificeerbare signalen.',
         'Technische logs — de hostingprovider (Vercel) bewaart kortstondig serverlogs (IP-adres, tijdstip, opgevraagde URL) voor beveiliging en werking van de site. Rechtsgrond: gerechtvaardigd belang (art. 6.1.f AVG).'],
      ]},
      { h: '3. Hoe lang ik gegevens bewaar', p: [
        ['Contact- en offerteaanvragen: maximaal 24 maanden na het laatste contact, of zolang nodig voor de uitvoering van een overeenkomst en de wettelijke boekhoudverplichtingen (7 jaar voor facturen).',
         'Google Analytics: 14 maanden (instelling van de property).',
         'Serverlogs: maximaal 30 dagen.',
         'Je cookiekeuze: bewaard in je browser (localStorage) tot je ze wist of wijzigt.'],
      ]},
      { h: '4. Met wie ik gegevens deel', p: [
        'Ik verkoop je gegevens nooit. Ik gebruik wel de volgende verwerkers: Vercel Inc. (hosting, VS — doorgifte op basis van de EU-standaardcontractbepalingen), Google Ireland Ltd. (Google Analytics, Gmail — doorgifte naar de VS onder het EU-US Data Privacy Framework), Meta Platforms Ireland Ltd. (WhatsApp, wanneer jij via dat kanaal contact opneemt) en mijn eigen n8n-server (EU). Elke verwerker is gebonden aan een verwerkersovereenkomst.',
      ]},
      { h: '5. Cookies', p: [
        'Deze site plaatst geen cookies vóór je keuze in de banner. Bij "Weigeren" worden alleen strikt noodzakelijke opslagitems gebruikt. Bij "Aanvaarden" worden de onderstaande analytics-cookies geplaatst. Je keuze kan je altijd wijzigen via de link "Cookies" onderaan elke pagina.',
      ]},
      { h: '6. Jouw rechten', p: [
        'Je hebt recht op inzage, verbetering, wissing, beperking, overdraagbaarheid en bezwaar, en je kan een gegeven toestemming op elk moment intrekken (zonder dat dit de rechtmatigheid van de verwerking vóór de intrekking aantast). Mail naar trimtmm@gmail.com; ik antwoord binnen 30 dagen. Je kan ook een klacht indienen bij de Gegevensbeschermingsautoriteit, Drukpersstraat 35, 1000 Brussel, www.gegevensbeschermingsautoriteit.be.',
      ]},
      { h: '7. Beveiliging en wijzigingen', p: [
        'De site wordt uitsluitend via HTTPS aangeboden en de toegang tot de gegevens is beperkt tot mijzelf. Dit beleid kan worden aangepast; de datum bovenaan geeft de laatste versie aan.',
      ]},
    ],
    cookies: {
      head: ['Naam', 'Aanbieder', 'Doel', 'Bewaartijd', 'Type'],
      rows: [
        ['cookie_consent', 'ttrim.studio', 'Onthoudt je keuze in de cookiebanner', 'Tot je ze wist', 'Noodzakelijk (localStorage)'],
        ['_ga', 'Google Analytics', 'Onderscheidt bezoekers', '2 jaar', 'Analytics — enkel na toestemming'],
        ['_ga_*', 'Google Analytics', 'Bewaart de sessiestatus', '2 jaar', 'Analytics — enkel na toestemming'],
      ],
    },
  },
  en: {
    back: 'Back to home',
    title: 'Privacy & cookie policy',
    updated: 'Last updated',
    cookieBtn: 'Change cookie preferences',
    sections: [
      { h: '1. Who is responsible', p: [
        'Trim Tahirsylaj (ttrim.studio), sole trader, VAT BE1036404220, [address to be completed], Belgium. E-mail: trimtmm@gmail.com. I am the data controller for the data collected through this website.',
      ]},
      { h: '2. What data I collect and why', p: [
        ['Contact by e-mail or WhatsApp — name, e-mail address or phone number and the content of your message. Purpose: answering your request and preparing a quote. Legal basis: pre-contractual steps (art. 6.1.b GDPR).',
         'Pricing configurator — name, e-mail address, chosen package, options, estimated price and your notes. They are sent over an encrypted connection to my own automation server (n8n, hosted in the EU) so I can send you a proposal. Legal basis: pre-contractual steps (art. 6.1.b GDPR).',
         'Statistics (Google Analytics 4) — only after your consent in the cookie banner: pages visited, device, browser, country, referring site, approximate location. Google anonymises IP addresses. Purpose: understanding how the site is used and improving it. Legal basis: consent (art. 6.1.a GDPR). Without consent no analytics cookies are set; Google Consent Mode then only sends cookieless, non-identifying signals.',
         'Technical logs — the hosting provider (Vercel) briefly keeps server logs (IP address, time, requested URL) for security and operation of the site. Legal basis: legitimate interest (art. 6.1.f GDPR).'],
      ]},
      { h: '3. How long I keep data', p: [
        ['Contact and quote requests: up to 24 months after the last contact, or as long as needed to perform a contract and meet legal bookkeeping obligations (7 years for invoices).',
         'Google Analytics: 14 months (property setting).',
         'Server logs: up to 30 days.',
         'Your cookie choice: stored in your browser (localStorage) until you clear or change it.'],
      ]},
      { h: '4. Who I share data with', p: [
        'I never sell your data. I do rely on the following processors: Vercel Inc. (hosting, US — transfer under the EU Standard Contractual Clauses), Google Ireland Ltd. (Google Analytics, Gmail — US transfer under the EU-US Data Privacy Framework), Meta Platforms Ireland Ltd. (WhatsApp, when you choose that channel) and my own n8n server (EU). Each processor is bound by a data processing agreement.',
      ]},
      { h: '5. Cookies', p: [
        'This site sets no cookies before you make a choice in the banner. With "Reject" only strictly necessary storage is used. With "Accept" the analytics cookies listed below are set. You can change your choice at any time via the "Cookies" link at the bottom of every page.',
      ]},
      { h: '6. Your rights', p: [
        'You have the right to access, rectify, erase, restrict, port and object, and you can withdraw consent at any time (without affecting the lawfulness of processing before withdrawal). E-mail trimtmm@gmail.com; I reply within 30 days. You can also lodge a complaint with the Belgian Data Protection Authority, Rue de la Presse 35, 1000 Brussels, www.dataprotectionauthority.be.',
      ]},
      { h: '7. Security and changes', p: [
        'The site is served over HTTPS only and access to the data is limited to me. This policy may be updated; the date at the top indicates the current version.',
      ]},
    ],
    cookies: {
      head: ['Name', 'Provider', 'Purpose', 'Retention', 'Type'],
      rows: [
        ['cookie_consent', 'ttrim.studio', 'Remembers your banner choice', 'Until you clear it', 'Necessary (localStorage)'],
        ['_ga', 'Google Analytics', 'Distinguishes visitors', '2 years', 'Analytics — only after consent'],
        ['_ga_*', 'Google Analytics', 'Keeps session state', '2 years', 'Analytics — only after consent'],
      ],
    },
  },
};

export default function PrivacyPage() {
  const [lang, setLang] = useState<'nl' | 'en'>(navigator.language.toLowerCase().startsWith('nl') ? 'nl' : 'en');
  const t = copy[lang];

  return (
    <div className="relative min-h-screen bg-black text-white">
      <MeshBackground />
      <main className="relative z-10 mx-auto max-w-3xl px-6 py-16 md:py-24">
        <div className="mb-10 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" /> {t.back}
          </Link>
          <div className="flex gap-1 rounded-full border border-white/10 p-1">
            {(['nl', 'en'] as const).map((l) => (
              <button key={l} onClick={() => setLang(l)}
                className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase transition-all ${lang === l ? 'bg-white text-black' : 'text-white/40 hover:text-white/60'}`}>
                {l}
              </button>
            ))}
          </div>
        </div>

        <h1 className="text-3xl font-medium tracking-tight md:text-4xl">{t.title}</h1>
        <p className="mt-2 text-xs uppercase tracking-widest text-white/40">{t.updated}: {UPDATED}</p>

        {t.sections.map((s) => (
          <section key={s.h} className="mt-10">
            <h2 className="text-lg font-medium">{s.h}</h2>
            {s.p.map((p, i) => Array.isArray(p)
              ? <ul key={i} className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-white/70">{p.map((li) => <li key={li}>{li}</li>)}</ul>
              : <p key={i} className="mt-3 text-sm leading-relaxed text-white/70">{p}</p>)}
            {s.h.startsWith('5') && (
              <>
                <div className="mt-4 overflow-x-auto rounded-xl border border-white/10">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-white/5 text-white/50">
                      <tr>{t.cookies.head.map((h) => <th key={h} className="px-3 py-2 font-medium">{h}</th>)}</tr>
                    </thead>
                    <tbody>
                      {t.cookies.rows.map((r) => (
                        <tr key={r[0]} className="border-t border-white/10 text-white/70">
                          {r.map((c, i) => <td key={i} className={`px-3 py-2 ${i === 0 ? 'font-mono text-white' : ''}`}>{c}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button type="button" onClick={openCookieSettings}
                  className="mt-4 rounded-full border border-white/20 px-4 py-2 text-xs font-medium transition-colors hover:bg-white/10">
                  {t.cookieBtn}
                </button>
              </>
            )}
          </section>
        ))}
      </main>
    </div>
  );
}
