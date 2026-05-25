/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  MessageSquare,
  Mail,
  Phone,
  Globe,
  ArrowUpRight,
  Menu,
  X,
  ExternalLink
} from 'lucide-react';

// --- i18n ---
const translations = {
  en: {
    nav: {
      portfolio: "Works",
      contact: "Get in touch"
    },
    hero: {
      line1: "Trim Tahirsylaj.",
      line2: "Web Artisan for Growing Businesses"
    },
    subtext: "Refining digital landscapes through thoughtful creation and strategic investment. Specializing in B2B solutions that prioritize clarity and sustainable performance.",
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
          desc: "Premium auto detailing services platform with advanced booking and service visualization.",
          tags: ["Development", "Creative Direction", "B2B"]
        },
        {
          title: "Pizza Truck Herri",
          url: "pizzatruckherri.com",
          desc: "Mobile gastronomy digital presence. Seamless experience from menu browsing to event booking.",
          tags: ["Digital Strategy", "E-commerce", "Brand"]
        },
        {
          title: "A Poppa",
          url: "apoppa.com",
          desc: "Italian culinary dining in Ghent and Evergem. Sophisticated digital presence reflecting authentic cuisine and refined hospitality.",
          tags: ["Digital Strategy", "Brand Design", "E-commerce"]
        }
      ]
    },
    apps: {
      title: "App Creator",
      subtitle: "Owlog",
      desc: "Refining how traders document their journey. Owlog provides a specialized framework for pattern recognition and psychological analysis.",
      status: "Out Now",
      type: "Journaling App",
      hint: "Click the mascot to open the App Store"
    },
    about: {
      title: "Philosophy",
      subtitle: "Technical Strategy",
      heading: "Thoughtful Creation & Strategic Logic.",
      desc: "Dedicated to helping established businesses build sophisticated digital foundations through a blend of technical expertise and strategic insight.",
      end: "I believe a digital presence should be as enduring as the businesses it represents."
    },
    contact: {
      title: "Connections",
      subtitle: "Open to new collaborations and investment opportunities.",
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
    footer: "All rights reserved."
  },
  nl: {
    nav: {
      portfolio: "Werken",
      contact: "Contact opnemen"
    },
    hero: {
      line1: "Trim Tahirsylaj.",
      line2: "Web Artisan voor Groeiende Bedrijven"
    },
    subtext: "Digitale landschappen verfijnen door doordachte creatie en strategische investeringen. Gespecialiseerd in B2B-oplossingen die prioriteit geven aan helderheid en duurzame prestaties.",
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
          desc: "Premium platform voor auto-detailing met geavanceerde boeking en servicevisualisatie.",
          tags: ["Ontwikkeling", "Creatieve Directie", "B2B"]
        },
        {
          title: "Pizza Truck Herri",
          url: "pizzatruckherri.com",
          desc: "Mobiele gastronomie digitale aanwezigheid. Naadloze ervaring van menu bladeren tot evenement boeking.",
          tags: ["Digitale Strategie", "E-commerce", "Merk"]
        },
        {
          title: "A Poppa",
          url: "apoppa.com",
          desc: "Italiaanse culinaire ervaring in Gent en Evergem. Elegante digitale aanwezigheid die authentieke keuken en verfijnde horeca weerspiegelt.",
          tags: ["Digitale Strategie", "Merkontwerp", "E-commerce"]
        }
      ]
    },
    apps: {
      title: "App Maker",
      subtitle: "Owlog",
      desc: "De manier waarop handelaren hun traject documenteren verfijnen. Owlog biedt een gespecialiseerd kader voor herkenning van patronen en psychologische analyse.",
      status: "Nu Uit",
      type: "Journaling App",
      hint: "Klik op de mascotte om de App Store te openen"
    },
    about: {
      title: "Filosofie",
      subtitle: "Technische Strategie",
      heading: "Doordachte Creatie & Strategische Logica.",
      desc: "Toegewijd aan het helpen van gevestigde bedrijven bij het bouwen van verfijnde digitale fundamenten door een mix van technische expertise en strategisch inzicht.",
      end: "Ik geloof dat een digitale aanwezigheid net zo duurzaam moet zijn als de bedrijven die het vertegenwoordigt."
    },
    contact: {
      title: "Verbindingen",
      subtitle: "Open voor nieuwe samenwerkingen en investeringsmogelijkheden.",
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
    footer: "Alle rechten voorbehouden."
  }
};

// --- Primitives ---

const LogoMark = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-6 ${className}`}>
    <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
      <a 
        href="https://postimg.cc/jnjQ34fV" 
        target="_blank" 
        rel="noopener noreferrer"
        className="block w-full h-full cursor-pointer"
      >
        <img 
          src="https://i.postimg.cc/J0N6nT4h/LO.png" 
          alt="Trim Tahirsylaj Logo" 
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
        />
      </a>
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
  return (
    <AnimatePresence>
      {visible && (
        <motion.nav 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-50 pt-6"
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
                <a href="#portfolio" className="text-white/70 text-xs font-semibold uppercase tracking-widest hover:text-white transition-colors">{t.nav.portfolio}</a>
                <a href="#contact" className="text-white/70 text-xs font-semibold uppercase tracking-widest hover:text-white transition-colors">{t.nav.contact}</a>
              </div>

              <div className="hidden lg:block">
                <WhatsAppButton label={t.cta} />
              </div>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

const Hero = ({ t }: { t: any }) => {
  return (
    <section className="relative z-10 pt-24 md:pt-40 pb-20 text-center flex flex-col items-center px-6" id="hero-section">
      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-6xl md:text-[10rem] font-black tracking-tighter leading-[1.05] pb-4"
        id="hero-headline"
      >
        <span className="block text-white mb-2">{t.hero.line1}</span>
        <span className="block animate-shiny" style={headlineGradientStyle}>{t.hero.line2}</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-12 text-white/50 max-w-xl text-base md:text-xl leading-[1.6] font-medium"
        id="hero-subtext"
      >
        {t.subtext}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-6 text-[10px] uppercase tracking-[0.5em] text-brand font-black"
      >
        {t.slogan}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="mt-14"
        id="hero-cta-group"
      >
        <WhatsAppButton label={t.cta} />
      </motion.div>
    </section>
  );
};

const Portfolio = ({ t }: { t: any }) => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-32 md:py-64 relative z-10" id="portfolio">
      <div className="mb-16 text-center md:text-left">
        <SectionEyebrow label={t.nav.portfolio} tag={t.portfolio.tag} />
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight">{t.portfolio.title}</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        {t.portfolio.projects.map((p: any, i: number) => (
          <motion.div
            key={p.url}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 0.8 }}
            className="group liquid-glass rounded-3xl p-10 border border-white/10 h-full flex flex-col hover:bg-white/[0.03] transition-colors text-center md:text-left"
          >
            <div className="flex flex-col items-center md:flex-row md:items-start md:justify-between mb-8 gap-4">
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                {p.tags.map((tag: string) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-white/5 text-[9px] font-bold uppercase tracking-widest text-white/40 border border-white/5">
                    {tag}
                  </span>
                ))}
              </div>
              <Globe className="w-5 h-5 text-white/20 group-hover:text-brand transition-colors" />
            </div>
            
            <div className="flex-1 flex flex-col">
              <div className="mb-6">
                <h3 className="text-3xl font-bold text-white mb-2">{p.title}</h3>
                <a href={`https://${p.url}`} target="_blank" rel="noopener noreferrer" className="text-brand font-medium text-sm flex items-center gap-1 hover:underline">
                  {p.url} <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="text-base text-white/50 leading-relaxed mb-10">{p.desc}</p>
              
              <div className="mt-auto">
                <a 
                  href={`https://${p.url}`} 
                  className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-white/60 group-hover:text-white transition-all group-hover:gap-4"
                >
                  {t.portfolio.viewProject} <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const AppCreator = ({ t }: { t: any }) => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-32 md:py-64 relative z-10 border-t border-white/5" id="apps">
      <div className="grid md:grid-cols-2 gap-12 items-center text-center md:text-left">
        <div>
          <SectionEyebrow label={t.apps.title} tag={t.apps.status} />
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 italic">
            {t.apps.subtitle}
          </h2>
          <p className="text-xl md:text-2xl text-white/60 leading-relaxed font-medium max-w-lg mb-10 mx-auto md:mx-0">
            {t.apps.desc}
          </p>
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/5 rounded-full border border-white/10">
            <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-white/60">{t.apps.status}</span>
          </div>
        </div>
        <div className="relative aspect-video rounded-[3rem] overflow-hidden border border-white/10 liquid-glass flex items-center justify-center group">
           <div className="absolute inset-0 bg-brand/5 group-hover:bg-brand/10 transition-colors" />
           <div className="relative z-10 text-center">
             <a 
               href="https://apps.apple.com/be/app/owlog/id6767484434" 
               target="_blank" 
               rel="noopener noreferrer"
               className="w-32 h-32 flex items-center justify-center mx-auto transform group-hover:scale-[1.3] transition-transform duration-700 ease-[0.22,1,0.36,1] overflow-hidden cursor-pointer"
             >
               <img 
                 src="https://i.postimg.cc/nrm81YVh/Basic.png" 
                 alt="Owlog Logo" 
                 className="w-full h-full object-contain"
                 referrerPolicy="no-referrer"
               />
             </a>
             <p className="mt-4 text-xs font-bold uppercase tracking-widest text-white/40 pointer-events-none group-hover:text-white/60 transition-colors px-4">
               {t.apps.hint}
             </p>
           </div>
           
           {/* Decorative elements */}
           <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-brand/10 blur-[100px] rounded-full" />
           <div className="absolute -top-20 -left-20 w-64 h-64 bg-brand/5 blur-[100px] rounded-full" />
        </div>
      </div>
    </section>
  );
};

const Expertise = ({ t }: { t: any }) => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-32 md:py-64 relative z-10 border-t border-white/5" id="expertise">
      <div className="grid md:grid-cols-12 gap-12 text-center md:text-left">
        <div className="md:col-span-5">
          <SectionEyebrow label={t.about.title} tag={t.about.subtitle} />
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.05]">
            {t.about.heading}
          </h2>
        </div>
        <div className="md:col-span-7 flex flex-col justify-center">
          <p className="text-lg md:text-2xl text-white/60 leading-relaxed font-medium">
            {t.about.desc} 
            <br /><br />
            <span className="text-white">{t.about.end}</span>
          </p>
        </div>
      </div>
    </section>
  );
};

const Contact = ({ t }: { t: any }) => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-32 md:py-64 relative z-10 border-t border-white/5" id="contact">
      <div className="grid md:grid-cols-2 gap-20 text-center md:text-left">
        <div>
          <SectionEyebrow label={t.nav.contact} tag={t.nav.contact} />
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">{t.contact.title}</h2>
          <p className="text-white/50 text-lg mb-12 max-w-md mx-auto md:mx-0">{t.contact.subtitle}</p>
          
          <div className="space-y-6 flex flex-col items-center md:items-start">
            <div className="flex items-center gap-6 group cursor-pointer" onClick={() => window.location.href = "mailto:trimtmm@gmail.com"}>
              <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center p-3 transition-colors group-hover:bg-brand group-hover:border-brand">
                <Mail className="w-full h-full text-white" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-1">{t.contact.email}</div>
                <div className="text-xl font-medium group-hover:text-brand transition-colors tracking-tight">trimtmm@gmail.com</div>
              </div>
            </div>

            <div className="flex items-center gap-6 group cursor-pointer" onClick={() => window.location.href = "tel:0488842993"}>
              <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center p-3 transition-colors group-hover:bg-brand group-hover:border-brand">
                <Phone className="w-full h-full text-white" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-1">{t.contact.phone}</div>
                <div className="text-xl font-medium group-hover:text-brand transition-colors tracking-tight">0488842993</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="liquid-glass rounded-[3rem] p-12 w-full max-w-md aspect-square flex flex-col items-center justify-center text-center relative border border-white/10 shadow-2xl"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-brand opacity-10 blur-[80px] rounded-full pointer-events-none" />
            
            <MessageSquare className="w-16 h-16 text-white/20 mb-8" />
            <h3 className="text-2xl font-bold mb-4">{t.contact.directChannel}</h3>
            <p className="text-white/40 text-sm mb-10 px-8 leading-relaxed">{t.contact.whatsappDesc}</p>
            <WhatsAppButton label={t.contact.getInTouch} full />
          </motion.div>
        </div>
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
    <div className="relative min-h-screen overflow-x-hidden bg-[#0c0c0c] text-white selection:bg-brand/30">
      {/* Noise Filters SVG */}
      <svg width="0" height="0" className="hidden" aria-hidden="true">
        <filter id="c3-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0" />
          <feComposite in2="SourceGraphic" operator="in" result="noise" />
          <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
        </filter>
      </svg>

      {/* Global background video */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover pointer-events-none"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4" 
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Vertical Guides */}
      <div className="hidden md:block pointer-events-none fixed inset-y-0 left-1/2 -translate-x-[calc(50%+36rem)] w-px bg-white/10 z-[5]" />
      <div className="hidden md:block pointer-events-none fixed inset-y-0 left-1/2 translate-x-[calc(-50%+36rem)] w-px bg-white/10 z-[5]" />

      <Navbar lang={lang} setLang={setLang} t={t} visible={navVisible} />
      
      <main className="relative z-10 pt-48 md:pt-64">
        <Hero t={t} />
        
        <div className="max-w-6xl mx-auto px-6 h-px bg-white/5 relative z-20" />
        
        <Expertise t={t} />
        <Portfolio t={t} />
        <AppCreator t={t} />
        <Contact t={t} />
        
        {/* Simple Final CTA with WhatsApp */}
        <section className="max-w-6xl mx-auto px-6 py-32 md:py-64 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="liquid-glass rounded-[4rem] px-8 py-24 text-center border border-white/10 relative overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-[300px] bg-gradient-to-b from-brand/5 to-transparent pointer-events-none" />
            <LogoMark className="mx-auto mb-12 opacity-40" />
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-8 max-w-2xl mx-auto">{t.finalCta.line1} <br /> {t.finalCta.line2}</h2>
            <WhatsAppButton label={t.cta} />
          </motion.div>
        </section>
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
            <a href="#portfolio" className="hover:text-white transition-colors">{t.nav.portfolio}</a>
            <a href="#contact" className="hover:text-white transition-colors">{t.nav.contact}</a>
            <a href="https://wa.me/32488842993" target="_blank" rel="noopener" className="hover:text-white transition-colors">WhatsApp</a>
          </div>
          
          <div className="relative group">
             <div className="absolute inset-0 bg-brand/30 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
             <LogoMark className="opacity-40 group-hover:opacity-100 transition-opacity duration-1000" />
          </div>

          <p className="text-[10px] uppercase tracking-[0.5em] text-white/20 font-medium">
            &copy; {new Date().getFullYear()} — <a href="https://www.termsfeed.com/live/abfcf96d-c901-4f6e-b353-6c691e5f083a" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline decoration-dotted underline-offset-4">{t.footer}</a>
          </p>
        </div>
      </footer>

    </div>
  );
}
