/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Check, Minus, ArrowLeft, MessageSquare, ChevronRight } from 'lucide-react';
import PricingConfigurator from '../components/PricingConfigurator';

// --- i18n (self-contained, mirrors App.tsx pattern) ---
const copy = {
  nl: {
    back: 'Terug naar home',
    eyebrow: 'Prijzen',
    title: 'Website Pakketten & Prijzen',
    subtitle:
      'Kies eenmalige aankoop voor volledige eigendom vanaf dag 1, of een abonnement voor een lagere instapprijs met alle diensten inbegrepen.',
    oneTime: 'EENMALIGE AANKOOP',
    oneTimeDesc:
      'Koop je website één keer aan. Je bezit de volledige broncode vanaf de eerste dag.',
    popular: 'MEEST POPULAIR',
    perMonth: '/mo',
    orSub: 'Of abonnement',
    packages: [
      { tier: 'STARTER', desc: "1 pagina", price: '€500', sub: '€200 + €25/mo', features: [true, true, true, false, false, false] },
      { tier: 'ADVANCED', desc: "Tot 5 pagina's", price: '€1.000', sub: '€400 + €50/mo', features: [true, true, true, false, false, false], popular: true },
      { tier: 'PREMIUM', desc: "5+ pagina's · CMS · DB", price: '€2.000*', sub: '€800 + €100/mo', features: [true, true, true, true, true, true] },
    ],
    featureLabels: ['Responsive design', 'Basis SEO', 'Contactformulier', 'CMS-integratie', 'Database', 'Custom animaties'],
    footnote: '* Premiumprijs is indicatief. Definitieve offerte na briefing.',
    b2bBox:
      'B2B & maatwerkprojecten — Voor projecten met complexe integraties (klantenportalen, CRM-koppelingen, marktplaatsen) is Premium een startpunt, geen plafond. Definitieve offerte volgt na een discovery call.',
    addonsEyebrow: 'ADD-ONS',
    addonsTitle: 'Uitbreidingen',
    addonsSubtitle: 'Los toevoegbaar aan elk pakket — de kern van wat TTMM onderscheidt.',
    addons: [
      { name: 'Chatbot / AI-assistent', price: '€800 – €2.500', desc: 'Van scripted FAQ-bot tot AI-assistent gekoppeld aan een kennisbank.' },
      { name: 'Automatisering', price: '€500 – €1.500', desc: 'E-mail, CRM en formulieren gekoppeld — minder handwerk, snellere opvolging.' },
      { name: 'E-commerce module', price: 'Vanaf €1.200', desc: 'Productcatalogus, winkelwagen en betaalintegratie.' },
      { name: 'Copywriting & SEO-teksten', price: '€400 – €1.000', desc: 'Pagina-teksten geoptimaliseerd voor zoekmachines.' },
      { name: 'Meertaligheid', price: '€300 – €800 / taal', desc: 'Volledige vertaling en lokalisatie per extra taal.' },
      { name: 'Technisch onderhoud', price: '€30 / maand', desc: 'Optioneel bij eenmalige aankoop — updates, back-ups, monitoring.' },
    ],
    configuratorEyebrow: 'OP MAAT',
    configuratorTitle: 'Stel je eigen offerte samen',
    configuratorSubtitle:
      'Kies je pakket en add-ons — je krijgt direct een richtprijs, en wij ontvangen je aanvraag automatisch.',
  },
  en: {
    back: 'Back to home',
    eyebrow: 'Pricing',
    title: 'Website Packages & Pricing',
    subtitle:
      'Choose a one-time purchase for full ownership from day one, or a subscription for a lower entry price with everything included.',
    oneTime: 'ONE-TIME PURCHASE',
    oneTimeDesc: 'Buy your website once. You own the full source code from day one.',
    popular: 'MOST POPULAR',
    perMonth: '/mo',
    orSub: 'Or subscription',
    packages: [
      { tier: 'STARTER', desc: '1 page', price: '€500', sub: '€200 + €25/mo', features: [true, true, true, false, false, false] },
      { tier: 'ADVANCED', desc: 'Up to 5 pages', price: '€1,000', sub: '€400 + €50/mo', features: [true, true, true, false, false, false], popular: true },
      { tier: 'PREMIUM', desc: '5+ pages · CMS · DB', price: '€2,000*', sub: '€800 + €100/mo', features: [true, true, true, true, true, true] },
    ],
    featureLabels: ['Responsive design', 'Basic SEO', 'Contact form', 'CMS integration', 'Database', 'Custom animations'],
    footnote: '* Premium price is indicative. Final quote after briefing.',
    b2bBox:
      'B2B & custom projects — For projects with complex integrations (client portals, CRM, marketplaces), Premium is a starting point, not a ceiling. Final quote follows a discovery call.',
    addonsEyebrow: 'ADD-ONS',
    addonsTitle: 'Extensions',
    addonsSubtitle: 'Add these to any package — the core of what sets TTMM apart.',
    addons: [
      { name: 'Chatbot / AI assistant', price: '€800 – €2,500', desc: 'From a scripted FAQ bot to an AI assistant tied to a knowledge base.' },
      { name: 'Automation', price: '€500 – €1,500', desc: 'Email, CRM and forms connected — less manual work, faster follow-up.' },
      { name: 'E-commerce module', price: 'From €1,200', desc: 'Product catalog, cart and payment integration.' },
      { name: 'Copywriting & SEO', price: '€400 – €1,000', desc: 'Page copy optimized for search engines.' },
      { name: 'Multilingual', price: '€300 – €800 / language', desc: 'Full translation and localization per extra language.' },
      { name: 'Technical maintenance', price: '€30 / month', desc: 'Optional add-on for one-time purchase — updates, backups, monitoring.' },
    ],
    configuratorEyebrow: 'CUSTOM',
    configuratorTitle: 'Build your own quote',
    configuratorSubtitle:
      "Pick your package and add-ons — get an instant estimate, and we'll receive your request automatically.",
  },
};

export default function PricingPage() {
  const [lang, setLang] = useState<'nl' | 'en'>('nl');
  const t = copy[lang];

  return (
    <div className="relative min-h-screen bg-[#050608] text-white selection:bg-brand/30">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 pt-6">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors bg-white/5 border border-white/10 rounded-full px-5 py-2.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {t.back}
          </Link>
          <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-1 h-10">
            {(['nl', 'en'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${
                  lang === l ? 'bg-white text-black scale-105' : 'text-white/40 hover:text-white/60'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="relative z-10 pt-40 pb-32 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center md:text-left"
        >
          <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span className="text-xs uppercase tracking-widest text-white/50">{t.eyebrow}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">{t.title}</h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto md:mx-0">{t.subtitle}</p>
        </motion.div>

        {/* One-time packages */}
        <section className="mb-8">
          <div className="bg-white text-black font-bold text-xs tracking-widest px-4 py-3 rounded-lg mb-3 inline-block">
            {t.oneTime}
          </div>
          <p className="text-white/40 text-sm mb-10 max-w-2xl">{t.oneTimeDesc}</p>

          <div className="grid md:grid-cols-3 gap-6">
            {t.packages.map((pkg, i) => (
              <motion.div
                key={pkg.tier}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`relative liquid-glass rounded-3xl p-8 border ${
                  pkg.popular ? 'border-brand' : 'border-white/10'
                } flex flex-col`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand text-black text-[9px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full whitespace-nowrap">
                    {t.popular}
                  </span>
                )}
                <div className="text-sm font-bold uppercase tracking-widest text-white mb-1">{pkg.tier}</div>
                <div className="text-brand text-xs font-semibold mb-4">{pkg.desc}</div>
                <div className="text-4xl font-black mb-1">{pkg.price}</div>
                <div className="text-white/30 text-xs mb-6">incl. BTW</div>

                <div className="border-t border-white/10 pt-4 mb-6">
                  <div className="text-white/30 text-[10px] uppercase tracking-widest mb-1">{t.orSub}</div>
                  <div className="text-white font-bold">{pkg.sub}</div>
                </div>

                <div className="space-y-2.5 mt-auto">
                  {t.featureLabels.map((label, idx) => (
                    <div key={label} className="flex items-center gap-3 text-sm">
                      {pkg.features[idx] ? (
                        <Check className="w-4 h-4 text-brand flex-shrink-0" />
                      ) : (
                        <Minus className="w-4 h-4 text-white/20 flex-shrink-0" />
                      )}
                      <span className={pkg.features[idx] ? 'text-white/80' : 'text-white/30'}>{label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-white/30 text-xs italic mt-6">{t.footnote}</p>

          <div className="mt-8 bg-brand/5 border-l-2 border-brand rounded-r-xl px-6 py-4 text-white/70 text-sm max-w-3xl">
            {t.b2bBox}
          </div>
        </section>

        {/* Add-ons */}
        <section className="mt-28">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span className="text-xs uppercase tracking-widest text-white/50">{t.addonsEyebrow}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">{t.addonsTitle}</h2>
          <p className="text-white/50 mb-12 max-w-2xl">{t.addonsSubtitle}</p>

          <div className="grid md:grid-cols-2 gap-4">
            {t.addons.map((addon, i) => (
              <motion.div
                key={addon.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="liquid-glass rounded-2xl p-6 border border-white/10 flex items-start justify-between gap-4"
              >
                <div>
                  <div className="font-bold text-white mb-1">{addon.name}</div>
                  <div className="text-white/40 text-sm">{addon.desc}</div>
                </div>
                <div className="text-brand font-bold text-sm whitespace-nowrap">{addon.price}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Configurator */}
        <section className="mt-28" id="configurator">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span className="text-xs uppercase tracking-widest text-white/50">{t.configuratorEyebrow}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">{t.configuratorTitle}</h2>
          <p className="text-white/50 mb-12 max-w-2xl">{t.configuratorSubtitle}</p>

          <PricingConfigurator lang={lang} />
        </section>

        {/* Bottom CTA */}
        <div className="mt-28 text-center">
          <a
            href="https://wa.me/32488842993"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-white text-black font-medium text-sm px-6 py-3.5 transition-all hover:bg-white/90 active:scale-[0.98]"
          >
            <MessageSquare className="w-4 h-4 fill-black/20" />
            <span>{lang === 'nl' ? 'Liever direct praten?' : 'Prefer to talk directly?'}</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </main>
    </div>
  );
}
