import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  CalendarDays,
  Images,
  Zap,
  LineChart,
  Calculator,
  ShieldCheck,
  Check,
  Columns2,
  PanelRight,
  Play,
} from 'lucide-react';
import MeshBackground from '../components/MeshBackground';

export const APP_STORE_URL = 'https://apps.apple.com/be/app/owlog/id6767484434';

type Lang = 'en' | 'nl';

const copy = {
  en: {
    back: 'ttrim.studio',
    eyebrow: 'Owlog for iPhone',
    title1: 'Your trading journal,',
    title2: 'finally clean.',
    sub: 'Log a trade in seconds, review it with the chart in front, and let the numbers show you what actually works.',
    download: 'Download on the',
    store: 'App Store',
    watch: 'See it in action',
    facts: ['Free to download', 'Your data stays on your iPhone', '8 languages', 'Made for iPhone Duo'],
    featuresTitle: 'Everything a trader needs. Nothing in the way.',
    features: [
      { title: 'Calendar journal', text: 'Every day coloured by its result, with weekly, monthly and yearly goals at a glance.' },
      { title: 'Chart-first review', text: 'Open a day and go through its trades one at a time: your screenshot first, then the numbers, then your own words.' },
      { title: 'Logged in seconds', text: 'Market, symbol, session and duration are taps and sliders — no menus. Your time goes into your notes.' },
      { title: 'Analytics that matter', text: 'Equity curve, win/loss split, long vs short, activity heatmap and session P&L to find your real edge.' },
      { title: 'Position size calculator', text: 'Type the stop in pips, points or price. Live ECB exchange rates, pip values that match Myfxbook to the cent.' },
      { title: 'Private by design', text: 'Everything is stored on your device, with optional sync through your own iCloud. No ads, no tracking.' },
    ],
    videosTitle: 'Watch it work',
    videos: [
      { src: 'review', title: 'Review your day', text: 'Swipe through each trade with the chart in front.' },
      { src: 'stats', title: 'Read your numbers', text: 'Switch periods and watch every metric update.' },
      { src: 'calc', title: 'Size it before you click', text: 'Change risk or market, the lot size follows instantly.' },
    ],
    galleryTitle: 'A closer look',
    gallery: ['Journal', 'Day review', 'Statistics', 'Recent trades', 'Analytics', 'Charts', 'Calculator', 'New trade'],
    duoEyebrow: 'iPhone Duo',
    duoTitle: 'Unfold it. Two columns.',
    duoText: 'On iPhone Duo, Owlog opens up into two columns: the calendar stays on the left while the day’s trades fill the right; your balance stays put while the charts scroll. The navigation bar moves to the side — left, right or bottom, you choose. Fold it, and it’s the iPhone app you know.',
    duoPoints: ['Two columns on every screen', 'Navigation bar on the left, right or bottom', 'Full landscape support'],
    duoTabs: ['Journal', 'Statistics', 'Analytics'],
    plansTitle: 'Start free. Go Pro when you’re ready.',
    free: 'Free',
    freeItems: ['Forex journal & calendar', 'Analytics for the last 7 days', 'Position calculator for every market', 'iCloud sync & 8 languages'],
    pro: 'Owlog Pro',
    proItems: ['Every market: indices, stocks, crypto, futures, commodities', 'Analytics across your full history', 'Multiple accounts', 'More screenshots and links per trade', 'PDF & CSV export'],
    proNote: 'Monthly or yearly subscription via the App Store. New users get a free 14-day full-access trial that does not auto-renew.',
    ctaTitle: 'Your next trade deserves a better journal.',
    legal: { support: 'Support', privacy: 'Privacy Policy', terms: 'Terms of Use', disclaimer: 'Risk Disclaimer' },
    risk: 'Trading involves significant risk. Owlog is a journaling and analysis tool, not financial advice.',
    madeBy: 'Designed and built by Trim Tahirsylaj',
  },
  nl: {
    back: 'ttrim.studio',
    eyebrow: 'Owlog voor iPhone',
    title1: 'Je tradingjournal,',
    title2: 'eindelijk overzichtelijk.',
    sub: 'Log een trade in een paar seconden, bekijk hem met de grafiek voorop en laat de cijfers tonen wat echt werkt.',
    download: 'Download in de',
    store: 'App Store',
    watch: 'Bekijk het in actie',
    facts: ['Gratis te downloaden', 'Je gegevens blijven op je iPhone', '8 talen', 'Gemaakt voor iPhone Duo'],
    featuresTitle: 'Alles wat een trader nodig heeft. Niets dat in de weg zit.',
    features: [
      { title: 'Kalenderjournal', text: 'Elke dag gekleurd volgens het resultaat, met week-, maand- en jaardoelen in één oogopslag.' },
      { title: 'Review met grafiek', text: 'Open een dag en loop de trades één voor één door: eerst je screenshot, dan de cijfers, dan je eigen woorden.' },
      { title: 'In seconden gelogd', text: 'Markt, symbool, sessie en duur zijn tikken en schuifregelaars — geen menu’s. Je tijd gaat naar je notities.' },
      { title: 'Analyses die tellen', text: 'Equitycurve, winst/verlies, long vs short, activiteitenkaart en P&L per sessie om je echte edge te vinden.' },
      { title: 'Positiecalculator', text: 'Typ de stop in pips, punten of prijs. Live ECB-wisselkoersen, pipwaarden tot op de cent gelijk aan Myfxbook.' },
      { title: 'Privé vanaf de basis', text: 'Alles staat op je toestel, met optionele synchronisatie via je eigen iCloud. Geen advertenties, geen tracking.' },
    ],
    videosTitle: 'Zie het werken',
    videos: [
      { src: 'review', title: 'Review je dag', text: 'Swipe door elke trade met de grafiek voorop.' },
      { src: 'stats', title: 'Lees je cijfers', text: 'Wissel van periode en zie elke statistiek meebewegen.' },
      { src: 'calc', title: 'Bepaal je positie vooraf', text: 'Pas risico of markt aan, de lotgrootte volgt meteen.' },
    ],
    galleryTitle: 'Van dichterbij',
    gallery: ['Journal', 'Dagreview', 'Statistieken', 'Recente trades', 'Analyses', 'Grafieken', 'Calculator', 'Nieuwe trade'],
    duoEyebrow: 'iPhone Duo',
    duoTitle: 'Open hem. Twee kolommen.',
    duoText: 'Op iPhone Duo opent Owlog zich in twee kolommen: de kalender blijft links terwijl de trades van de dag rechts staan; je saldo blijft staan terwijl de grafieken scrollen. De navigatiebalk schuift naar de zijkant — links, rechts of onderaan, jij kiest. Klap hem dicht en het is de iPhone-app die je kent.',
    duoPoints: ['Twee kolommen op elk scherm', 'Navigatiebalk links, rechts of onderaan', 'Volledige ondersteuning voor liggend'],
    duoTabs: ['Journal', 'Statistieken', 'Analyses'],
    plansTitle: 'Begin gratis. Ga Pro wanneer je klaar bent.',
    free: 'Gratis',
    freeItems: ['Forexjournal & kalender', 'Analyses van de laatste 7 dagen', 'Positiecalculator voor elke markt', 'iCloud-sync & 8 talen'],
    pro: 'Owlog Pro',
    proItems: ['Elke markt: indices, aandelen, crypto, futures, grondstoffen', 'Analyses over je volledige geschiedenis', 'Meerdere accounts', 'Meer screenshots en links per trade', 'Export naar PDF & CSV'],
    proNote: 'Maand- of jaarabonnement via de App Store. Nieuwe gebruikers krijgen een gratis proefperiode van 14 dagen met volledige toegang, zonder automatische verlenging.',
    ctaTitle: 'Je volgende trade verdient een beter journal.',
    legal: { support: 'Support', privacy: 'Privacybeleid', terms: 'Gebruiksvoorwaarden', disclaimer: 'Risicodisclaimer' },
    risk: 'Trading brengt aanzienlijke risico’s met zich mee. Owlog is een journal- en analysetool, geen financieel advies.',
    madeBy: 'Ontworpen en gebouwd door Trim Tahirsylaj',
  },
} as const;

const featureIcons = [CalendarDays, Images, Zap, LineChart, Calculator, ShieldCheck];
const galleryFiles = ['01-journal', '02-day-review', '03-statistics', '04-recent', '05-analytics', '06-charts', '07-calculator', '08-editor'];
const duoFiles = ['journal', 'stats', 'analytics'];

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

function AppleLogo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 384 512" className={className} fill="currentColor" aria-hidden="true">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

function StoreButton({ t, large = false }: { t: (typeof copy)[Lang]; large?: boolean }) {
  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-3 rounded-2xl bg-white text-black transition-transform hover:scale-[1.03] active:scale-[0.98] ${large ? 'px-7 py-4' : 'px-5 py-3'}`}
    >
      <AppleLogo className={large ? 'h-8 w-8' : 'h-6 w-6'} />
      <span className="flex flex-col text-left leading-tight">
        <span className="text-[11px] font-medium opacity-70">{t.download}</span>
        <span className={`${large ? 'text-2xl' : 'text-lg'} font-semibold tracking-tight`}>{t.store}</span>
      </span>
    </a>
  );
}

/** CSS iPhone frame around a screenshot or video. */
function Phone({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative rounded-[2.9rem] bg-gradient-to-b from-zinc-700 via-zinc-900 to-zinc-800 p-[3px] shadow-[0_40px_120px_-20px_rgba(6,182,212,0.35)] ${className}`}>
      <div className="relative rounded-[2.75rem] bg-black p-[9px]">
        <div className="relative overflow-hidden rounded-[2.2rem] bg-black aspect-[1206/2622]">
          {children}
          <div className="pointer-events-none absolute left-1/2 top-[1.4%] h-[3.3%] w-[30%] -translate-x-1/2 rounded-full bg-black" />
        </div>
      </div>
    </div>
  );
}

/** Book-style foldable frame with a visible hinge down the middle. */
function Duo({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative rounded-[2.4rem] bg-gradient-to-br from-zinc-600 via-zinc-900 to-zinc-700 p-[3px] shadow-[0_50px_140px_-30px_rgba(249,115,22,0.35)]">
      <div className="relative rounded-[2.25rem] bg-black p-3 md:p-4">
        <div className="relative overflow-hidden rounded-[1.6rem] bg-black aspect-[1914/1376]">
          <AnimatePresence mode="wait">
            <motion.img
              key={src}
              src={src}
              alt={alt}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
          </AnimatePresence>
          {/* Fold crease */}
          <div className="pointer-events-none absolute inset-y-0 left-1/2 w-10 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-black/50" />
        </div>
        <div className="absolute right-[24%] top-[3%] h-2.5 w-2.5 rounded-full bg-zinc-900 ring-1 ring-white/10" />
      </div>
      {/* Hinge on the frame edge */}
      <div className="absolute -bottom-1 left-1/2 h-2 w-24 -translate-x-1/2 rounded-full bg-zinc-800" />
    </div>
  );
}

function Video({ name }: { name: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  // React doesn't reliably set the `muted` attribute, and browsers only
  // autoplay muted video — so mute and start it by hand.
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      src={`/owlog/videos/${name}.mp4`}
      poster={`/owlog/videos/${name}-poster.jpg`}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
    />
  );
}

export default function OwlogPage() {
  const [lang, setLang] = useState<Lang>(navigator.language.toLowerCase().startsWith('nl') ? 'nl' : 'en');
  const [duoTab, setDuoTab] = useState(0);
  const t = copy[lang];

  useEffect(() => {
    document.title = 'Owlog — Trading journal for iPhone';
    window.scrollTo(0, 0);
    return () => {
      document.title = 'Trim Tahirsylaj — Sites. Apps. Automation.';
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-black text-white">
      <MeshBackground />

      {/* Top bar */}
      <header className="fixed inset-x-0 top-[env(safe-area-inset-top)] z-50 pt-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
          <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white/70 backdrop-blur-md transition-colors hover:text-white">
            <ArrowLeft className="h-3.5 w-3.5" /> {t.back}
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex rounded-full border border-white/10 bg-black/40 p-1 backdrop-blur-md">
              {(['nl', 'en'] as const).map((l) => (
                <button key={l} onClick={() => setLang(l)}
                  className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase transition-all ${lang === l ? 'bg-white text-black' : 'text-white/40 hover:text-white/60'}`}>
                  {l}
                </button>
              ))}
            </div>
            <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-black sm:inline-flex">
              <AppleLogo className="h-3.5 w-3.5" /> {t.store}
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero */}
        <section className="mx-auto grid max-w-6xl items-center gap-14 px-6 pb-20 pt-32 md:grid-cols-[1.1fr_0.9fr] md:pt-40">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <div className="mb-8 flex items-center gap-4">
              <img src="/owlog/icon.webp" alt="Owlog app icon" className="h-20 w-20 rounded-[1.4rem] shadow-[0_20px_60px_-10px_rgba(6,182,212,0.6)]" />
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-cyan-300">{t.eyebrow}</span>
            </div>
            <h1 className="text-5xl font-black leading-[0.95] tracking-tighter md:text-7xl">
              {t.title1}
              <span className="block bg-gradient-to-r from-cyan-300 via-cyan-400 to-orange-400 bg-clip-text italic text-transparent">{t.title2}</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/60 md:text-xl">{t.sub}</p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <StoreButton t={t} large />
              <a href="#videos" className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-white">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5"><Play className="h-4 w-4" /></span>
                {t.watch}
              </a>
            </div>
          </motion.div>
          <motion.div className="relative mx-auto w-[260px] md:w-[300px]"
            initial={{ opacity: 0, y: 50, rotate: 4 }} animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
            <Phone><Video name="review" /></Phone>
            <img src="/owlog/mascot.png" alt="" className="absolute -bottom-8 -left-10 w-28 drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] md:-bottom-10 md:-left-28 md:w-44" />
          </motion.div>
        </section>

        {/* Facts */}
        <section className="mx-auto max-w-6xl px-6">
          <div className="liquid-glass grid grid-cols-2 gap-px overflow-hidden rounded-3xl md:grid-cols-4">
            {t.facts.map((fact) => (
              <div key={fact} className="flex items-center gap-3 bg-black/30 px-5 py-5 text-sm font-semibold text-white/80">
                <Check className="h-4 w-4 shrink-0 text-cyan-300" /> {fact}
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-6xl px-6 py-28">
          <motion.h2 {...fadeUp} className="max-w-3xl text-4xl font-black tracking-tighter md:text-6xl">{t.featuresTitle}</motion.h2>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.features.map((feature, i) => {
              const Icon = featureIcons[i];
              return (
                <motion.div key={feature.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.06 }}
                  className="liquid-glass rounded-3xl bg-white/[0.02] p-7">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">{feature.title}</h3>
                  <p className="mt-3 leading-relaxed text-white/60">{feature.text}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Videos */}
        <section id="videos" className="mx-auto max-w-6xl scroll-mt-24 px-6 pb-28">
          <motion.h2 {...fadeUp} className="text-4xl font-black tracking-tighter md:text-6xl">{t.videosTitle}</motion.h2>
          <div className="mt-14 grid gap-12 md:grid-cols-3">
            {t.videos.map((video, i) => (
              <motion.div key={video.src} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }} className="text-center">
                <Phone className="mx-auto w-[230px]"><Video name={video.src} /></Phone>
                <h3 className="mt-8 text-xl font-bold">{video.title}</h3>
                <p className="mt-2 text-white/55">{video.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* iPhone Duo */}
        <section className="relative py-28">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/30 to-transparent" />
          <div className="relative mx-auto max-w-6xl px-6">
            <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-orange-300">
                <Columns2 className="h-3.5 w-3.5" /> {t.duoEyebrow}
              </span>
              <h2 className="mt-6 text-4xl font-black tracking-tighter md:text-6xl">{t.duoTitle}</h2>
              <p className="mt-6 text-lg leading-relaxed text-white/60">{t.duoText}</p>
            </motion.div>

            <motion.div {...fadeUp} className="mx-auto mt-14 max-w-4xl">
              <div className="mb-6 flex justify-center gap-2">
                {t.duoTabs.map((tab, i) => (
                  <button key={tab} onClick={() => setDuoTab(i)}
                    className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${duoTab === i ? 'bg-white text-black' : 'border border-white/15 text-white/60 hover:text-white'}`}>
                    {tab}
                  </button>
                ))}
              </div>
              <Duo src={`/owlog/duo/${duoFiles[duoTab]}.webp`} alt={`Owlog on iPhone Duo — ${t.duoTabs[duoTab]}`} />
            </motion.div>

            <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">
              {t.duoPoints.map((point, i) => (
                <div key={point} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm font-semibold text-white/80">
                  {i === 1 ? <PanelRight className="h-4 w-4 shrink-0 text-orange-300" /> : <Columns2 className="h-4 w-4 shrink-0 text-orange-300" />}
                  {point}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-28">
          <motion.h2 {...fadeUp} className="mx-auto max-w-6xl px-6 text-4xl font-black tracking-tighter md:text-6xl">{t.galleryTitle}</motion.h2>
          {/* Endless marquee: the list is rendered twice and shifted by
              exactly half its width, so the loop has no visible seam. */}
          <div className="marquee mt-14 overflow-hidden pb-8 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
            <div className="marquee-track flex w-max gap-8">
              {[0, 1].map((copy) =>
                galleryFiles.map((file, i) => (
                  <figure key={`${copy}-${file}`} aria-hidden={copy === 1} className="w-[220px] shrink-0 md:w-[250px]">
                    <Phone><img src={`/owlog/screens/${file}.jpg`} alt={copy === 0 ? t.gallery[i] : ''} loading="lazy" className="absolute inset-0 h-full w-full object-cover" /></Phone>
                    <figcaption className="mt-5 text-center text-sm font-semibold text-white/60">{t.gallery[i]}</figcaption>
                  </figure>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Plans */}
        <section className="mx-auto max-w-6xl px-6 pb-28">
          <motion.h2 {...fadeUp} className="max-w-3xl text-4xl font-black tracking-tighter md:text-6xl">{t.plansTitle}</motion.h2>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            <motion.div {...fadeUp} className="liquid-glass rounded-3xl bg-white/[0.02] p-8">
              <div className="flex items-center gap-4">
                <img src="/owlog/mascot.png" alt="" className="h-16 w-16 object-contain" />
                <h3 className="text-3xl font-black tracking-tight">{t.free}</h3>
              </div>
              <ul className="mt-8 space-y-4">
                {t.freeItems.map((item) => (
                  <li key={item} className="flex gap-3 text-white/75"><Check className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />{item}</li>
                ))}
              </ul>
            </motion.div>
            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}
              className="relative overflow-hidden rounded-3xl border border-orange-400/30 bg-gradient-to-br from-orange-500/15 via-black/40 to-cyan-500/10 p-8">
              <div className="flex items-center gap-4">
                <img src="/owlog/mascot-pro.png" alt="" className="h-16 w-16 object-contain" />
                <h3 className="text-3xl font-black tracking-tight">{t.pro}</h3>
              </div>
              <ul className="mt-8 space-y-4">
                {t.proItems.map((item) => (
                  <li key={item} className="flex gap-3 text-white/80"><Check className="mt-0.5 h-5 w-5 shrink-0 text-orange-300" />{item}</li>
                ))}
              </ul>
              <p className="mt-8 text-sm text-white/50">{t.proNote}</p>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <motion.div {...fadeUp} className="liquid-glass relative overflow-hidden rounded-[2.5rem] bg-white/[0.02] px-8 py-16 text-center md:py-20">
            <img src="/owlog/icon.webp" alt="" className="mx-auto h-24 w-24 rounded-[1.6rem] shadow-[0_20px_60px_-10px_rgba(6,182,212,0.6)]" />
            <h2 className="mx-auto mt-8 max-w-2xl text-4xl font-black tracking-tighter md:text-5xl">{t.ctaTitle}</h2>
            <div className="mt-10 flex justify-center"><StoreButton t={t} large /></div>
          </motion.div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 pt-10 pb-[max(2.5rem,calc(env(safe-area-inset-bottom)+1.5rem))]">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 text-sm text-white/45 md:flex-row md:items-center md:justify-between">
          <div>
            <p>{t.risk}</p>
            <p className="mt-1">© {new Date().getFullYear()} Owlog · {t.madeBy}</p>
          </div>
          <nav className="flex flex-wrap gap-5">
            <Link to="/owlog/support" className="hover:text-white">{t.legal.support}</Link>
            <Link to="/owlog/privacy" className="hover:text-white">{t.legal.privacy}</Link>
            <Link to="/owlog/terms" className="hover:text-white">{t.legal.terms}</Link>
            <Link to="/owlog/disclaimer" className="hover:text-white">{t.legal.disclaimer}</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
