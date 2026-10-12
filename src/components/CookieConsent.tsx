import { useEffect, useState } from 'react';

type Choice = 'granted' | 'denied';
const KEY = 'cookie_consent';
export const OPEN_EVENT = 'open-cookie-settings';

const copy = {
  nl: {
    text: 'We gebruiken cookies om het verkeer te analyseren (Google Analytics) en de site te verbeteren. Geen cookies vóór je keuze.',
    accept: 'Aanvaarden',
    reject: 'Weigeren',
    policy: 'Privacybeleid',
  },
  en: {
    text: 'We use cookies to analyse traffic (Google Analytics) and improve the site. No cookies are set before you choose.',
    accept: 'Accept',
    reject: 'Reject',
    policy: 'Privacy policy',
  },
};

declare global {
  interface Window { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[] }
}

const read = (): Choice | null => {
  try { const v = localStorage.getItem(KEY); return v === 'granted' || v === 'denied' ? v : null; } catch { return null; }
};

const apply = (choice: Choice) => {
  try { localStorage.setItem(KEY, choice); } catch { /* private mode */ }
  window.gtag?.('consent', 'update', { analytics_storage: choice });
  window.dataLayer?.push({ event: 'consent_update', analytics_storage: choice });
};

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const lang = typeof navigator !== 'undefined' && navigator.language.toLowerCase().startsWith('nl') ? 'nl' : 'en';
  const t = copy[lang];

  useEffect(() => {
    if (read() === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  if (!open) return null;

  const choose = (c: Choice) => { apply(c); setOpen(false); };

  return (
    <div role="dialog" aria-live="polite" aria-label="Cookies"
      className="fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-[100] mx-auto max-w-xl rounded-2xl border border-white/10 bg-black/90 p-5 text-white shadow-2xl backdrop-blur md:inset-x-auto md:right-6 md:left-auto">
      <p className="text-sm leading-relaxed text-white/80">
        {t.text}{' '}
        <a href="/privacy" className="underline decoration-dotted underline-offset-4 hover:text-white">{t.policy}</a>
      </p>
      <div className="mt-4 flex gap-3">
        <button type="button" onClick={() => choose('denied')}
          className="flex-1 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-white/10">
          {t.reject}
        </button>
        <button type="button" onClick={() => choose('granted')}
          className="flex-1 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-white/90">
          {t.accept}
        </button>
      </div>
    </div>
  );
}

/** Riapre il banner (link "Cookies" nel footer). */
export const openCookieSettings = () => window.dispatchEvent(new Event(OPEN_EVENT));
