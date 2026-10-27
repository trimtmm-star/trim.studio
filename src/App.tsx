/**
* @license
* SPDX-License-Identifier: Apache-2.0
*/

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
ChevronRight,
MessageSquare,
Mail,
ArrowUpRight,
Menu,
X,
ExternalLink
} from 'lucide-react';
import MeshBackground from './components/MeshBackground';
import { openCookieSettings } from './components/CookieConsent';

// --- i18n ---
const translations = {
en: {
nav: {
portfolio: "Works",
contact: "Get in touch"
},
hero: {
line1: "Trim Tahirsylaj.",
line2: "Crafted sites. Real apps. Smart automation."
},
slogan: "Execution beats ideas.",
cta: "Start a Conversation",
portfolio: {
title: "Selected Works",
subtitle: "B2B & Digital Partnerships",
viewProject: "Explore",
tag: "Selected",
projects: [
{
title: "Detailing Bros",
url: "detailingbros.be",
img: "detailingbros",
desc: "Car detailing · Evergem",
tags: ["Development", "Creative Direction", "B2B"]
},
{
title: "Pizza Truck Herri",
url: "pizzatruckherri.com",
img: "pizzatruckherri",
desc: "Pizza truck & catering",
tags: ["Digital Strategy", "E-commerce", "Brand"]
},
{
title: "A Poppa",
url: "apoppa.com",
img: "apoppa",
desc: "Italian restaurant · Ghent",
tags: ["Digital Strategy", "Brand Design", "E-commerce"]
},
{
title: "Kantara International",
url: "kantara-international.com",
img: "kantara-international",
desc: "B2B trade · Europe ↔ Africa",
tags: ["B2B", "Digital Strategy"]
}
]
},
apps: {
title: "App Creator",
subtitle: "Owlog",
desc: "Trading journal for iPhone.",
status: "Out Now",
type: "Journaling App",
hint: "Click the icon to open the App Store",
discover: "Discover Owlog"
},
about: {
title: "Philosophy",
subtitle: "Technical Strategy",
heading: "Thoughtful Creation & Strategic Logic.",
desc: "Dedicated to helping established businesses build sophisticated digital foundations through a blend of technical expertise and strategic insight.",
end: "I believe a digital presence should be as enduring as the businesses it represents."
},
contact: {
title: "Contact",
subtitle: "Got a project? Let's talk.",
getInTouch: "Say hello",
email: "Email",
phone: "Phone",
directChannel: "Direct Channel",
whatsappDesc: "Swift responses for high-level technical or financial inquiries via WhatsApp."
},
finalCta: {
line1: "Building with Purpose.",
line2: "In Pursuit of Excellence."
},
footer: "All rights reserved · Privacy & cookies"
},
nl: {
nav: {
portfolio: "Werken",
contact: "Contact opnemen"
},
hero: {
line1: "Trim Tahirsylaj.",
line2: "Vakkundige sites. Echte apps. Slimme automatisatie."
},
slogan: "Executie wint van ideeën.",
cta: "Start een Gesprek",
portfolio: {
title: "Geselecteerd Werk",
subtitle: "B2B & Digitale Partnerschappen",
viewProject: "Ontdekken",
tag: "Geselecteerd",
projects: [
{
title: "Detailing Bros",
url: "detailingbros.be",
img: "detailingbros",
desc: "Car detailing · Evergem",
tags: ["Ontwikkeling", "Creatieve Directie", "B2B"]
},
{
title: "Pizza Truck Herri",
url: "pizzatruckherri.com",
img: "pizzatruckherri",
desc: "Pizzatruck & catering",
tags: ["Digitale Strategie", "E-commerce", "Merk"]
},
{
title: "A Poppa",
url: "apoppa.com",
img: "apoppa",
desc: "Italiaans restaurant · Gent",
tags: ["Digitale Strategie", "Merkontwerp", "E-commerce"]
},
{
title: "Kantara International",
url: "kantara-international.com",
img: "kantara-international",
desc: "B2B handel · Europa ↔ Afrika",
tags: ["B2B", "Digitale Strategie"]
}
]
},
apps: {
title: "App Maker",
subtitle: "Owlog",
desc: "Trading journal voor iPhone.",
status: "Nu Uit",
type: "Journaling App",
hint: "Klik op het icoon om de App Store te openen",
discover: "Ontdek Owlog"
},
about: {
title: "Filosofie",
subtitle: "Technische Strategie",
heading: "Doordachte Creatie & Strategische Logica.",
desc: "Toegewijd aan het helpen van gevestigde bedrijven bij het bouwen van verfijnde digitale fundamenten door een mix van technische expertise en strategisch inzicht.",
end: "Ik geloof dat een digitale aanwezigheid net zo duurzaam moet zijn als de bedrijven die het vertegenwoordigt."
},
contact: {
title: "Contact",
subtitle: "Een project in gedachten? Laten we praten.",
getInTouch: "Zeg hallo",
email: "E-mail",
phone: "Telefoon",
directChannel: "Direct Kanaal",
whatsappDesc: "Snelle reacties voor technische of financiële vragen op hoog niveau via WhatsApp."
},
finalCta: {
line1: "Bouwen met Doel.",
line2: "Op Zoek naar Uitmuntendheid."
},
footer: "Alle rechten voorbehouden · Privacy & cookies"
}
};

// --- Smooth scroll utility ---
const smoothScrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// --- Primitives ---

const LogoMark = ({ className = "" }: { className?: string }) => (
<div className={`flex items-center gap-6 ${className}`}>
<div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
<img
src="https://i.postimg.cc/J0N6nT4h/LO.png"
alt="Trim Tahirsylaj Logo"
className="w-full h-full object-contain"
referrerPolicy="no-referrer"
/>
</div>
</div>
);

const WhatsAppButton = ({ label, full = false }: { label: string; full?: boolean }) => (
<a
href="https://wa.me/32488842993"
target="_blank"
rel="noopener noreferrer"
className={`group inline-flex items-center justify-center gap-2 rounded-full bg-white text-black font-medium text-sm px-6 py-3.5 transition-all hover:bg-white/90 active:scale-[0.98] ${full ? 'w-full' : ''}`}
id="whatsapp-cta"
>
<MessageSquare className="w-4 h-4 fill-black/20" />
<span>{label}</span>
<ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
</a>
);

const SectionEyebrow = ({ label, tag }: { label: string; tag?: string }) => (
<div className="flex items-center justify-center md:justify-start gap-2 mb-4">
<span className="w-1.5 h-1.5 rounded-full bg-white" />
<span className="text-xs uppercase tracking-widest text-white/50">{label}</span>
{tag && (
<span className="px-2 py-0.5 rounded-full border border-white/10 text-[10px] text-white/50 font-medium">
{tag}
</span>
)}
</div>
);

const headlineGradientStyle = {
backgroundImage: 'linear-gradient(to right, #091020 0%, #0B2551 12.5%, #A4F4FD 32.5%, #00d2ff 50%, #0B2551 67.5%, #091020 87.5%, #091020 100%)',
backgroundSize: '200% auto',
WebkitBackgroundClip: 'text',
backgroundClip: 'text',
color: 'transparent',
WebkitTextFillColor: 'transparent',
filter: 'url(#c3-noise)'
};

// --- Sections ---

const Navbar = ({ lang, setLang, t, visible }: { lang: 'en' | 'nl', setLang: (l: 'en' | 'nl') => void, t: any, visible: boolean }) => {
const [mobileOpen, setMobileOpen] = useState(false);

useEffect(() => {
if (!visible) setMobileOpen(false);
}, [visible]);

const handleMobileNav = (id: string) => {
setMobileOpen(false);
smoothScrollTo(id);
};

return (
<AnimatePresence>
{visible && (
<motion.nav
initial={{ opacity: 0, y: -20 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -20 }}
transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
className="fixed top-[env(safe-area-inset-top)] left-0 right-0 z-50 pt-6"
id="main-nav"
>
<div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
<LogoMark />

<div className="flex items-center gap-4 md:gap-8">
<div className="flex items-center bg-white/5 border border-white/10 rounded-full p-1 h-10">
{(['nl', 'en'] as const).map((l) => (
<button
key={l}
onClick={() => setLang(l)}
className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${lang === l ? 'bg-white text-black shadow-lg scale-105' : 'text-white/40 hover:text-white/60'}`}
>
{l}
</button>
))}
</div>

<div className="hidden md:flex gap-8 items-center bg-white/[0.03] backdrop-blur-md border border-white/5 px-6 py-2 rounded-full">
<button onClick={() => smoothScrollTo('portfolio')} className="text-white/70 text-xs font-semibold uppercase tracking-widest hover:text-white transition-colors">{t.nav.portfolio}</button>
<Link to="/pricing" className="text-white/70 text-xs font-semibold uppercase tracking-widest hover:text-white transition-colors">
  Pricing
</Link>
<button onClick={() => smoothScrollTo('contact')} className="text-white/70 text-xs font-semibold uppercase tracking-widest hover:text-white transition-colors">{t.nav.contact}</button>
</div>

<div className="hidden lg:block">
<WhatsAppButton label={t.cta} />
</div>

<button
onClick={() => setMobileOpen((v) => !v)}
className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white"
aria-label="Menu"
aria-expanded={mobileOpen}
>
{mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
</button>
</div>
</div>

<AnimatePresence>
{mobileOpen && (
<motion.div
initial={{ opacity: 0, y: -10 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -10 }}
transition={{ duration: 0.25 }}
className="md:hidden mx-6 mt-3 bg-[#0a0c10] border border-white/15 rounded-2xl overflow-hidden shadow-2xl shadow-black/50"
>
<button onClick={() => handleMobileNav('portfolio')} className="w-full text-left px-6 py-4 text-white text-sm font-semibold uppercase tracking-widest hover:bg-white/10 transition-colors border-b border-white/10">{t.nav.portfolio}</button>
<Link to="/pricing" onClick={() => setMobileOpen(false)} className="block px-6 py-4 text-white text-sm font-semibold uppercase tracking-widest hover:bg-white/10 transition-colors border-b border-white/10">
Pricing
</Link>
<button onClick={() => handleMobileNav('contact')} className="w-full text-left px-6 py-4 text-white text-sm font-semibold uppercase tracking-widest hover:bg-white/10 transition-colors">{t.nav.contact}</button>
</motion.div>
)}
</AnimatePresence>
</motion.nav>
)}
</AnimatePresence>
);
};

const Hero = ({ t }: { t: any }) => {
return (
<section className="relative z-10 pt-16 md:pt-28 pb-16 md:pb-24 text-center flex flex-col items-center px-6" id="hero-section">
<motion.h1
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
className="text-6xl md:text-[9rem] font-black tracking-tighter leading-[1.02] pb-4"
id="hero-headline"
>
<span className="block text-white">{t.hero.line1}</span>
<span className="block mt-6 text-4xl md:text-7xl leading-[1.1] tracking-tight animate-shiny" style={headlineGradientStyle}>{t.hero.line2.split(". ").map((s: string, i: number, a: string[]) => <span key={i} className="block">{s}{i < a.length - 1 ? "." : ""}</span>)}</span>
</motion.h1>

<motion.button
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ delay: 0.9, duration: 0.8 }}
onClick={() => smoothScrollTo('portfolio')}
className="mt-10 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-white/50 hover:text-white transition-colors"
>
{t.nav.portfolio} <ChevronRight className="w-4 h-4 rotate-90" />
</motion.button>
</section>
);
};

// One project: big browser shot with the phone version overlapping it.
const ProjectShowcase = ({ p, i, t }: { p: any; i: number; t: any; key?: string }) => {
const flip = i % 2 === 1;
return (
<motion.a
href={`https://${p.url}`}
target="_blank"
rel="noopener noreferrer"
initial={{ opacity: 0, y: 40 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-80px" }}
transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
className="group block"
>
<div className={`relative ${flip ? 'md:pl-24' : 'md:pr-24'} pb-10 md:pb-0`}>
<div className="rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl shadow-black/60">
<div className="flex items-center gap-1.5 px-4 h-8 bg-black/60 border-b border-white/10">
<span className="w-2.5 h-2.5 rounded-full bg-white/20" />
<span className="w-2.5 h-2.5 rounded-full bg-white/20" />
<span className="w-2.5 h-2.5 rounded-full bg-white/20" />
<span className="ml-3 text-[10px] text-white/40 tracking-wide">{p.url}</span>
</div>
<div className="aspect-[16/10] overflow-hidden">
<img src={`/work/${p.img}.jpg`} alt={p.title} loading="lazy" className="w-full h-full object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]" />
</div>
</div>
<div className={`absolute bottom-0 ${flip ? 'left-4 md:left-0' : 'right-4 md:right-0'} md:bottom-[-2.5rem] w-[28%] md:w-[19%] rounded-[1.4rem] md:rounded-[2rem] overflow-hidden border-[3px] border-white/15 bg-black shadow-2xl shadow-black/70 transition-transform duration-700 group-hover:-translate-y-2`}>
<img src={`/work/${p.img}-m.jpg`} alt="" loading="lazy" className="w-full aspect-[390/844] object-cover object-top" />
</div>
</div>
<div className={`mt-6 md:mt-12 flex items-end justify-between gap-6 ${flip ? 'md:pl-24' : 'md:pr-24'}`}>
<div>
<h3 className="text-3xl md:text-5xl font-bold tracking-tight">{p.title}</h3>
<p className="mt-2 text-white/40 text-sm md:text-base">{p.desc}</p>
</div>
<span className="shrink-0 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/50 group-hover:text-white transition-colors">
{t.portfolio.viewProject} <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
</span>
</div>
</motion.a>
);
};

const Portfolio = ({ t }: { t: any }) => {
return (
<section className="max-w-6xl mx-auto px-6 py-16 md:py-24 relative z-10" id="portfolio">
<div className="mb-16 md:mb-24 text-center md:text-left">
<SectionEyebrow label={t.nav.portfolio} tag={t.portfolio.tag} />
<h2 className="text-4xl md:text-6xl font-bold tracking-tight">{t.portfolio.title}</h2>
</div>
<div className="flex flex-col gap-28 md:gap-44">
{t.portfolio.projects.map((p: any, i: number) => (
<ProjectShowcase key={p.url} p={p} i={i} t={t} />
))}
</div>
</section>
);
};

const AppCreator = ({ t }: { t: any }) => {
const shots = ['journal', 'stats', 'analytics'];
return (
<section className="max-w-6xl mx-auto px-6 py-32 md:py-48 relative z-10" id="apps">
<div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14 text-center md:text-left">
<div className="flex flex-col items-center md:items-start">
<SectionEyebrow label={t.apps.title} tag={t.apps.status} />
<div className="flex items-center gap-5">
<img src="/owlog/icon.png" alt="Owlog" className="w-16 h-16 md:w-20 md:h-20 rounded-[1.2rem]" />
<h2 className="text-5xl md:text-7xl font-black tracking-tighter">{t.apps.subtitle}</h2>
</div>
<p className="mt-4 text-white/40 text-base md:text-lg">{t.apps.desc}</p>
</div>
<div className="flex flex-wrap items-center justify-center gap-3">
<Link to="/owlog" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full text-xs font-bold uppercase tracking-widest hover:scale-[1.03] transition-transform">
{t.apps.discover} <ArrowUpRight className="w-4 h-4" />
</Link>
<a href="https://apps.apple.com/be/app/owlog/id6767484434" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white hover:border-white/40 transition-colors">
App Store <ExternalLink className="w-3.5 h-3.5" />
</a>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
{shots.map((s, i) => (
<motion.div
key={s}
initial={{ opacity: 0, y: 40 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-60px" }}
transition={{ delay: i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
className="rounded-3xl overflow-hidden border border-white/10 bg-white/5"
>
<img src={`/owlog/duo/${s}.jpg`} alt={`Owlog ${s}`} loading="lazy" className="w-full h-full object-cover" />
</motion.div>
))}
</div>
</section>
);
};

const Contact = ({ t }: { t: any }) => {
return (
<section className="max-w-6xl mx-auto px-6 py-32 md:py-48 relative z-10 border-t border-white/5 text-center" id="contact">
<h2 className="text-5xl md:text-8xl font-black tracking-tighter">{t.contact.subtitle}</h2>
<div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
<WhatsAppButton label={t.contact.getInTouch} />
<a href="mailto:trimtmm@gmail.com" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/15 text-sm font-medium text-white/80 hover:text-white hover:border-white/40 transition-colors">
<Mail className="w-4 h-4" /> trimtmm@gmail.com
</a>
</div>
</section>
);
};

// --- App Root ---

export default function App() {
const [lang, setLang] = useState<'en' | 'nl'>('nl');
const [navVisible, setNavVisible] = useState(true);
const [lastScrollY, setLastScrollY] = useState(0);
const t = translations[lang];

useEffect(() => {
document.documentElement.style.scrollBehavior = 'smooth';
return () => { document.documentElement.style.scrollBehavior = ''; };
}, []);

useEffect(() => {
const handleScroll = () => {
const currentScrollY = window.scrollY;

if (currentScrollY < 50) {
setNavVisible(true);
} else if (currentScrollY > lastScrollY) {
setNavVisible(false);
} else {
setNavVisible(true);
}

setLastScrollY(currentScrollY);
};

window.addEventListener('scroll', handleScroll, { passive: true });
return () => window.removeEventListener('scroll', handleScroll);
}, [lastScrollY]);

return (
<div className="relative min-h-screen overflow-x-clip text-white selection:bg-brand/30">
{/* Noise Filters SVG */}
<svg width="0" height="0" className="hidden" aria-hidden="true">
<filter id="c3-noise">
<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0" />
<feComposite in2="SourceGraphic" operator="in" result="noise" />
<feBlend in="SourceGraphic" in2="noise" mode="multiply" />
</filter>
</svg>

{/* Animated MeshGradient Background */}
<MeshBackground />
{/* Vertical Guides */}
<div className="hidden md:block pointer-events-none fixed inset-y-0 left-1/2 -translate-x-[calc(50%+36rem)] w-px bg-white/10 z-[5]" />
<div className="hidden md:block pointer-events-none fixed inset-y-0 left-1/2 translate-x-[calc(-50%+36rem)] w-px bg-white/10 z-[5]" />

<Navbar lang={lang} setLang={setLang} t={t} visible={navVisible} />

<main className="relative z-10 pt-40 md:pt-52">
<Hero t={t} />
<Portfolio t={t} />
<AppCreator t={t} />
<Contact t={t} />
</main>

<footer className="relative z-10 py-24 md:py-32 border-t border-white/5 text-center overflow-hidden">
{/* Background Overlay */}
<div className="absolute inset-0 pointer-events-none opacity-[0.03] flex items-center justify-center z-0">
<svg viewBox="0 0 256 256" className="w-[800px] h-[800px] text-white fill-current">
<path d="M 0 128 C 70.692 128 128 185.308 128 256 L 64 256 C 64 220.654 35.346 192 0 192 Z M 256 192 C 220.654 192 192 220.654 192 256 L 128 256 C 128 185.308 185.308 128 256 128 Z M 128 0 C 128 70.692 70.692 128 0 128 L 0 64 C 35.346 64 64 35.346 64 0 Z M 192 0 C 192 35.346 220.654 64 256 64 L 256 128 C 185.308 128 128 70.692 128 0 Z" />
</svg>
</div>

<div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-12 relative z-10">
<div className="flex items-center gap-8 text-[11px] uppercase font-black tracking-[0.4em] text-white/20">
<button onClick={() => smoothScrollTo('portfolio')} className="hover:text-white transition-colors">{t.nav.portfolio}</button>
<Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link>
<button onClick={() => smoothScrollTo('contact')} className="hover:text-white transition-colors">{t.nav.contact}</button>
<a href="https://wa.me/32488842993" target="_blank" rel="noopener" className="hover:text-white transition-colors">WhatsApp</a>
<button onClick={openCookieSettings} className="hover:text-white transition-colors">Cookies</button>
</div>

<div className="relative group">
<div className="absolute inset-0 bg-brand/30 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
<LogoMark className="opacity-40 group-hover:opacity-100 transition-opacity duration-1000" />
</div>

<p className="text-[10px] uppercase tracking-[0.5em] text-white/20 font-medium">
&copy; {new Date().getFullYear()} — <Link to="/privacy" className="hover:text-white transition-colors underline decoration-dotted underline-offset-4">{t.footer}</Link>
</p>
<p className="text-[10px] uppercase tracking-[0.5em] text-white/20 font-medium">BTW: BE1036404220</p>
</div>
</footer>

</div>
);
}
