import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';
import MeshBackground from '../components/MeshBackground';

const EMAIL = 'trimtmm@gmail.com';

/** A block is a paragraph, or a bullet list when it's an array. */
type Block = string | string[];
type Section = { h: string; body: Block[] };
type Doc = { title: string; updated: string; intro?: string; sections: Section[] };

/** Verbatim copy of the Owlog Notion pages (support, privacy, terms, risk) — Notion is the source of truth. */
const documents: Record<string, Doc> = {
  privacy: {
    title: 'Privacy Policy',
    updated: 'Effective date: May 14, 2026',
    intro: 'Owlog (“the app”, “we”) is a personal trading journal published on the Apple App Store. We respect your privacy. This policy explains what data the app handles, where it is stored, and what your rights are.',
    sections: [
      { h: '1. Data we collect', body: [
        'Owlog stores only the data you enter into the app:',
        ['Account names, balances and currencies', 'Asset classes you select', 'Trade records, notes, tags, links and screenshots', 'Calculator preferences', 'Language and appearance settings', '(Optional) The email Apple shares with you when you choose Sign in with Apple'],
        'We do not collect:',
        ['Analytics events', 'Crash reports through third-party SDKs', 'Device identifiers for advertising (IDFA)', 'Location data', 'Contacts, calendar or health data'],
      ]},
      { h: '2. Where your data is stored', body: [
        'All data is stored locally on your iPhone or iPad.',
        'If you enable iCloud Sync in Settings, Owlog writes a snapshot file to your personal iCloud Documents container so your data is available across the Apple devices signed in to your Apple ID. This sync is handled entirely by Apple. We do not have server-side access to your iCloud data.',
      ]},
      { h: '3. Sign in with Apple', body: [
        'If you choose Sign in with Apple, Apple shares with the app an opaque user identifier and (optionally) the email you decide to share. This information is stored only on your device, to label your account inside Owlog. Apple manages the authentication. Owlog never receives your Apple ID password.',
        'You can continue using Owlog without signing in by choosing “Use as guest” in onboarding.',
      ]},
      { h: '4. Photos and Camera', body: [
        'Photo library and camera access are requested only when you attach a screenshot or photo to a trade. Owlog never scans your photo library in the background.',
      ]},
      { h: '5. Third-party services', body: [
        'Owlog uses the following Apple services: App Store, In-App Purchase, Sign in with Apple, iCloud Documents. These are governed by Apple’s own privacy policy.',
        'The in-app News feature opens an external website (ForexFactory) in an in-app web view. That website may process data under its own privacy policy.',
        'Owlog does not integrate Google, Facebook, Firebase, analytics SDKs, advertising networks or any third-party tracker.',
      ]},
      { h: '6. Sharing & sale of data', body: [
        'We do not sell, share or transfer your data to any third party. Owlog is free of advertising and tracking.',
      ]},
      { h: '7. Your rights', body: [
        'You can at any time:',
        ['Delete individual trades, accounts or goals from inside the app', 'Reset the entire app from Settings → Reset Owlog, which permanently removes all local data from this device', 'Disable iCloud Sync from Settings → Cloud Sync', `Request information or deletion of data by writing to ${EMAIL}`],
      ]},
      { h: '8. Children', body: [
        'Owlog is not directed at children under the age of 13. If you believe a child has provided data to the app, please contact us and we will help remove it.',
      ]},
      { h: '9. Changes to this policy', body: [
        'We may update this policy when the app changes. The current version is always available at owlog.notion.site and inside the app under Settings → Legal documents → Privacy Policy.',
      ]},
      { h: '10. Contact', body: [`For any privacy question, write to ${EMAIL}.`] },
    ],
  },
  terms: {
    title: 'Terms of Use',
    updated: 'Effective May 14, 2026',
    intro: 'By installing and using Owlog (“the app”) you agree to these terms.',
    sections: [
      { h: '1. What Owlog is', body: [
        'Owlog is a journaling, education and analysis tool for traders. Owlog is NOT a broker, investment adviser, signal service, exchange, financial institution or regulated trading venue. We do not place trades, hold funds, or provide investment advice.',
      ]},
      { h: '2. Your responsibility', body: [
        'You are solely responsible for:',
        ['Every trading decision you make', 'The accuracy of the data you record in the app', 'Complying with the laws, broker rules and tax obligations of your jurisdiction'],
      ]},
      { h: '3. Subscriptions and in-app purchases', body: [
        'Owlog includes a free tier and an optional paid plan called Owlog Pro, available as an auto-renewable In-App Purchase (Monthly or Yearly).',
        ['14-day trial: new users receive 14 days of full access. The trial is free and does not auto-renew into a paid subscription.',
          'Owlog Pro: payment is charged to your Apple ID at confirmation of purchase. The subscription renews automatically unless cancelled at least 24 hours before the end of the current period. You can manage or cancel from your Apple ID settings.',
          'Refunds: refunds for App Store purchases are issued by Apple at reportaproblem.apple.com.'],
      ]},
      { h: '4. Availability', body: [
        'Features may change, be added or be removed over time. Market data, calendars, news, web links and third-party content may be unavailable or inaccurate and must always be verified independently before trading.',
      ]},
      { h: '5. Intellectual property', body: [
        'The Owlog name, mascots, design, app screens and original copy are owned by the developer. Third-party names (Apple, App Store, etc.) are referenced only descriptively and remain trademarks of their respective owners. You may not copy, redistribute or resell the app’s content without written permission.',
      ]},
      { h: '6. Termination', body: [
        'You may stop using Owlog at any time by deleting the app. We may suspend or terminate access if the app is used in violation of these terms or applicable law.',
      ]},
      { h: '7. Limitation of liability', body: [
        'Owlog is provided “as is”, without warranty of any kind. To the maximum extent permitted by law, the developer is not liable for any loss, including financial loss, arising from your use of the app.',
      ]},
      { h: '8. Governing law', body: [
        'These terms are governed by the laws of Italy. Disputes are subject to the exclusive jurisdiction of the courts of the developer’s place of residence, unless a mandatory consumer law applies.',
      ]},
      { h: '9. Contact', body: [`For questions about these terms, write to ${EMAIL}.`] },
    ],
  },
  disclaimer: {
    title: 'Risk Disclaimer',
    updated: 'Effective May 14, 2026',
    sections: [
      { h: 'Trading involves substantial risk', body: [
        'Trading forex, crypto, futures, stocks, indices, commodities and other leveraged products involves significant risk and can result in the loss of all your capital. Past performance does not guarantee future results.',
        'You should never trade with money you cannot afford to lose.',
      ]},
      { h: 'Owlog is not financial advice', body: [
        'All calculations, analytics, goals, charts, summaries and notes shown inside Owlog are informational only. They are NOT investment, financial, legal or tax advice and must not be relied upon as such.',
        'Owlog’s position size calculator, expectancy, profit factor, R-multiple and other metrics are estimates derived from the data you entered. The accuracy of those metrics depends on the accuracy of your input.',
      ]},
      { h: 'Verify before you trade', body: [
        'Always verify position sizing, pip values, market rates, news, spreads and broker rules independently before placing any trade. Do not place trades based solely on what you see inside Owlog.',
      ]},
      { h: 'Regulatory note', body: [
        'Owlog is not licensed as a financial service provider. If your jurisdiction restricts trading-related apps, you are responsible for checking local rules before using Owlog.',
      ]},
      { h: 'Contact', body: [`For questions about this disclaimer, write to ${EMAIL}.`] },
    ],
  },
  support: {
    title: 'Owlog Support',
    updated: 'Last updated: May 2026',
    intro: 'Owlog is the operating journal for traders who want to log, review, and improve their performance — trade after trade, setup after setup. If something is not working or you have a question, the fastest way to reach us is by email. We typically reply within 1–2 business days (Monday–Friday, CET).',
    sections: [
      { h: 'When you write us, please include', body: [
        ['Your iOS version (Settings → General → About → Software Version)', 'Your iPhone / iPad model', 'The Owlog version (Settings → scroll to the bottom)', 'A short description of what happened and, if possible, a screenshot'],
      ]},
      { h: 'How does the 14-day trial work?', body: [
        'When you install Owlog you automatically receive 14 days of full access to every feature. The trial is completely free and does not auto-renew into a paid subscription. After day 14, Owlog stays free with limited features (Forex journal + last 7 days of analytics). You can upgrade to Owlog Pro at any time from inside the app.',
      ]},
      { h: 'How do I upgrade to Owlog Pro?', body: [
        'Open the app → Settings → Owlog Pro card (or any “Unlock Owlog Pro” CTA) → choose Monthly or Yearly → confirm with Face ID / Touch ID. The purchase is handled by Apple.',
      ]},
      { h: 'How do I cancel my subscription?', body: [
        'Subscriptions purchased through the App Store are managed by Apple. Open Settings on your iPhone → tap your Apple ID at the top → Subscriptions → Owlog Pro → Cancel Subscription. You will keep Pro access until the end of the current billing period.',
      ]},
      { h: 'Can I get a refund?', body: [
        'Refunds for App Store subscriptions are issued by Apple, not by Owlog. You can request one at reportaproblem.apple.com.',
      ]},
      { h: 'Where is my data stored?', body: [
        'Everything you enter in Owlog is stored locally on your device. If you enable iCloud Sync in Settings, a snapshot of your data is saved to your personal iCloud Documents so it is available across the Apple devices signed in to your Apple ID. We do not run a server and we cannot access your data.',
      ]},
      { h: 'How do I delete all my data?', body: [
        'Open Settings → Reset Owlog. This permanently removes every account, trade, goal and preference from this device. Data synced to iCloud follows your Apple ID and iCloud settings.',
      ]},
      { h: 'I cannot restore my purchase / the Upgrade screen is empty', body: [
        ['Make sure you are signed in to the App Store with the same Apple ID you used to purchase Owlog Pro', 'Check your internet connection', 'In the Upgrade screen, tap Restore Purchases at the bottom', 'If it still does not work, write to us at the email above with your Apple ID’s purchase receipt'],
      ]},
      { h: 'Is Owlog a broker? Does it place trades?', body: [
        'No. Owlog is a journaling and analytics tool. It does NOT place trades, hold funds, connect to brokers, or provide investment advice. You are fully responsible for every trading decision.',
      ]},
      { h: 'About', body: [
        'Owlog is built by an independent developer who trades. We focus on clean tools, no ads, no tracking, no third-party data sharing.',
      ]},
    ],
  },
};

const order = ['support', 'privacy', 'terms', 'disclaimer'] as const;

export default function OwlogLegalPage() {
  const { doc = '' } = useParams();
  const page = documents[doc];

  useEffect(() => {
    if (page) document.title = `${page.title} — Owlog`;
    window.scrollTo(0, 0);
  }, [page]);

  if (!page) return <Navigate to="/owlog" replace />;

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
            <h1 className="text-3xl font-medium tracking-tight md:text-4xl">{page.title}</h1>
            <p className="mt-1 text-xs uppercase tracking-widest text-white/40">{page.updated}</p>
          </div>
        </div>

        {page.intro && <p className="mt-10 leading-relaxed text-white/70">{page.intro}</p>}

        {doc === 'support' && (
          <a href={`mailto:${EMAIL}?subject=Owlog%20support`}
            className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-white px-6 py-4 font-semibold text-black transition-transform hover:scale-[1.02]">
            <Mail className="h-5 w-5" /> {EMAIL}
          </a>
        )}

        {page.sections.map((section) => (
          <section key={section.h} className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-lg font-medium">{section.h}</h2>
            {section.body.map((block, i) => Array.isArray(block)
              ? <ul key={i} className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-white/70">{block.map((item) => <li key={item}>{item}</li>)}</ul>
              : <p key={i} className="mt-3 text-sm leading-relaxed text-white/70">{block}</p>)}
          </section>
        ))}

        <nav className="mt-12 flex flex-wrap gap-5 text-sm text-white/50">
          {order.filter((key) => key !== doc).map((key) => (
            <Link key={key} to={`/owlog/${key}`} className="hover:text-white">{documents[key].title}</Link>
          ))}
        </nav>
      </main>
    </div>
  );
}
