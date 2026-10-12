import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import MeshBackground from '../components/MeshBackground';

const UPDATED = 'October 2026';

const DEVELOPER =
  'Owlog is developed by Trim Tahirsylaj (ttrim.studio), sole proprietorship, VAT BE1036404220, Schoonstraat 175A, 9940 Evergem, Belgium. Contact: trimtmm@gmail.com.';

type Doc = { title: string; intro: string; sections: [string, string][] };

/** Same documents as inside the app (Settings → Legal documents). */
const documents: Record<string, Doc> = {
  privacy: {
    title: 'Privacy Policy',
    intro: DEVELOPER,
    sections: [
      ['Data we collect',
        'Owlog is a personal trading journal. The app stores the data you enter — account names, balances, currencies, asset classes, trades, notes, screenshots, calculator preferences, language and appearance settings — locally on your device. We do not run an analytics backend, we do not use third-party advertising tracking, and we do not sell your data.'],
      ['iCloud sync',
        'When iCloud sync is enabled in Settings, Owlog writes a snapshot file to your personal iCloud Documents container so your data is available across the Apple devices signed in to your Apple ID. This sync is handled entirely by Apple; Owlog has no server-side access to your iCloud data.'],
      ['Photos & Camera',
        'Photos and camera access are requested only when you attach media to a trade. Owlog never scans your photo library in the background.'],
      ['Sign in with Apple',
        'If you choose Sign in with Apple, your Apple ID identifier and the email you optionally share are stored only on your device to label your account inside Owlog. Apple manages the authentication; Owlog does not receive your Apple ID password.'],
      ['Exchange rates',
        'The position size calculator downloads public reference exchange rates published by the European Central Bank through frankfurter.app. The request contains no personal or trading data; like any internet request, the service can see your IP address. The latest rates are cached on your device.'],
      ['Economic calendar',
        'The news button opens the ForexFactory economic calendar (forexfactory.com) inside the app. That page is provided by ForexFactory and subject to its own privacy policy; links leaving forexfactory.com open in Safari.'],
      ['Your rights',
        'You can delete individual trades or accounts at any time, or reset the entire app from Settings → Reset Owlog. Resetting removes all local data from this device. Data synced via iCloud is also subject to your Apple ID and iCloud settings. For any privacy question, write to trimtmm@gmail.com.'],
    ],
  },
  terms: {
    title: 'Terms of Use',
    intro: DEVELOPER,
    sections: [
      ['What Owlog is',
        'Owlog is a journaling, education and analysis tool for traders. Owlog is NOT a broker, investment adviser, signal service, exchange, financial institution or regulated trading venue. We do not place trades, hold funds, or provide investment advice.'],
      ['Your responsibility',
        'You are solely responsible for every trading decision you make, for the accuracy of the data you record, and for complying with the laws, broker rules and tax obligations of your jurisdiction.'],
      ['Subscriptions & in-app purchases',
        'Owlog includes a free tier and an optional paid plan (Owlog Pro) available as an In-App Purchase. New users receive a 14-day full-access trial that does not auto-renew. Subscriptions purchased through the App Store are subject to Apple’s payment, cancellation and refund policy and can be managed in your Apple ID settings.'],
      ['Availability & changes',
        'Features may change, be added or be removed. Market data, calendars, exchange rates, web links and third-party content may be unavailable or inaccurate and must be verified independently before trading.'],
      ['Intellectual property',
        'The Owlog name, mascots, design and original copy are owned by the developer. Third-party names (Apple, App Store, etc.) are referenced only descriptively and remain trademarks of their respective owners.'],
    ],
  },
  disclaimer: {
    title: 'Risk Disclaimer',
    intro: DEVELOPER,
    sections: [
      ['Trading involves risk',
        'Trading forex, crypto, futures, stocks, indices, commodities and other leveraged products involves significant risk and can result in the loss of all your capital. Past performance does not guarantee future results.'],
      ['Not financial advice',
        'All calculations, analytics, goals, charts, summaries and notes shown inside Owlog are informational only. They are NOT investment, financial, legal or tax advice and should not be relied upon as such.'],
      ['Verify before you trade',
        'Always verify position sizing, pip values, market rates, news, spreads and broker rules independently before placing any trade. The numbers shown by Owlog’s calculator are estimates based on the data you enter and on standard contract specifications, which can differ between brokers.'],
    ],
  },
};

export default function OwlogLegalPage() {
  const { doc = '' } = useParams();
  const document_ = documents[doc];

  useEffect(() => {
    if (document_) document.title = `${document_.title} — Owlog`;
    window.scrollTo(0, 0);
  }, [document_]);

  if (!document_) return <Navigate to="/owlog" replace />;

  return (
    <div className="relative min-h-screen bg-black text-white">
      <MeshBackground />
      <main className="relative z-10 mx-auto max-w-3xl px-6 py-16 md:py-24">
        <Link to="/owlog" className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Owlog
        </Link>

        <div className="mt-10 flex items-center gap-4">
          <img src="/owlog/icon.png" alt="" className="h-14 w-14 rounded-2xl" />
          <div>
            <h1 className="text-3xl font-medium tracking-tight md:text-4xl">{document_.title}</h1>
            <p className="mt-1 text-xs uppercase tracking-widest text-white/40">Last updated: {UPDATED}</p>
          </div>
        </div>

        <p className="mt-10 text-sm leading-relaxed text-white/60">{document_.intro}</p>

        {document_.sections.map(([heading, body]) => (
          <section key={heading} className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-lg font-medium">{heading}</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70">{body}</p>
          </section>
        ))}

        <nav className="mt-12 flex flex-wrap gap-5 text-sm text-white/50">
          {Object.entries(documents).filter(([key]) => key !== doc).map(([key, d]) => (
            <Link key={key} to={`/owlog/${key}`} className="hover:text-white">{d.title}</Link>
          ))}
        </nav>
      </main>
    </div>
  );
}
