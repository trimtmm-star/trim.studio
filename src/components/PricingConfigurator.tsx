/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

const N8N_WEBHOOK_URL = 'https://n8n.ttrim.studio/webhook/pricing-configurator';

type PackageId = 'starter' | 'advanced' | 'premium';
type AddonId = 'chatbot' | 'automation' | 'ecommerce' | 'copy' | 'multilingual' | 'maintenance';

const PACKAGES: Record<PackageId, { label: string; desc: { nl: string; en: string }; oneTime: number; startFee: number; monthly: number }> = {
  starter: { label: 'Starter', desc: { nl: '1 pagina', en: '1 page' }, oneTime: 500, startFee: 200, monthly: 25 },
  advanced: { label: 'Advanced', desc: { nl: "Tot 5 pagina's", en: 'Up to 5 pages' }, oneTime: 1000, startFee: 400, monthly: 50 },
  premium: { label: 'Premium', desc: { nl: "5+ pagina's · CMS · DB", en: '5+ pages · CMS · DB' }, oneTime: 2000, startFee: 800, monthly: 100 },
};

const ADDONS: Record<AddonId, { label: { nl: string; en: string }; min: number; max: number; monthly?: boolean }> = {
  chatbot: { label: { nl: 'Chatbot / AI-assistent', en: 'Chatbot / AI assistant' }, min: 800, max: 2500 },
  automation: { label: { nl: 'Automatisering', en: 'Automation' }, min: 500, max: 1500 },
  ecommerce: { label: { nl: 'E-commerce module', en: 'E-commerce module' }, min: 1200, max: 1800 },
  copy: { label: { nl: 'Copywriting & SEO-teksten', en: 'Copywriting & SEO' }, min: 400, max: 1000 },
  multilingual: { label: { nl: 'Meertaligheid (per taal)', en: 'Multilingual (per language)' }, min: 300, max: 800 },
  maintenance: { label: { nl: 'Technisch onderhoud (€30/mo)', en: 'Technical maintenance (€30/mo)' }, min: 0, max: 0, monthly: true },
};

const money = (n: number) => `€${n.toLocaleString('nl-BE')}`;

export default function PricingConfigurator({ lang = 'nl' as 'nl' | 'en' }) {
  const [pkg, setPkg] = useState<PackageId>('advanced');
  const [addons, setAddons] = useState<Set<AddonId>>(new Set());
  const [billing, setBilling] = useState<'onetime' | 'subscription'>('onetime');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const toggleAddon = (id: AddonId) => {
    setAddons((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const estimate = useMemo(() => {
    const base = PACKAGES[pkg];
    let min = billing === 'onetime' ? base.oneTime : base.startFee;
    let max = min;
    let monthlyExtra = 0;

    addons.forEach((id) => {
      const a = ADDONS[id];
      if (a.monthly) {
        monthlyExtra += 30;
      } else {
        min += a.min;
        max += a.max;
      }
    });

    const monthly = billing === 'subscription' ? base.monthly + monthlyExtra : monthlyExtra;
    return { min, max, monthly };
  }, [pkg, addons, billing]);

  const labels = {
    nl: {
      step1: '1. Kies je pakket',
      step2: '2. Kies add-ons (optioneel)',
      billing: 'Betaalwijze',
      onetime: 'Eenmalig',
      subscription: 'Abonnement',
      estimate: 'Richtprijs',
      estimateNote: 'Indicatief — definitieve offerte na korte intake.',
      monthlyExtra: 'per maand',
      name: 'Naam',
      email: 'E-mail',
      notes: 'Toelichting (optioneel)',
      notesPlaceholder: 'Vertel kort over je project...',
      submit: 'Vraag offerte aan',
      sending: 'Versturen...',
      sent: 'Verstuurd — we nemen snel contact op.',
      error: 'Er ging iets mis. Probeer opnieuw of mail trimtmm@gmail.com.',
    },
    en: {
      step1: '1. Choose your package',
      step2: '2. Choose add-ons (optional)',
      billing: 'Billing',
      onetime: 'One-time',
      subscription: 'Subscription',
      estimate: 'Estimate',
      estimateNote: 'Indicative — final quote after a short intake.',
      monthlyExtra: 'per month',
      name: 'Name',
      email: 'Email',
      notes: 'Notes (optional)',
      notesPlaceholder: 'Briefly describe your project...',
      submit: 'Request quote',
      sending: 'Sending...',
      sent: "Sent — we'll get back to you shortly.",
      error: 'Something went wrong. Try again or email trimtmm@gmail.com.',
    },
  }[lang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setStatus('sending');

    const payload = {
      timestamp: new Date().toISOString(),
      lang,
      package: PACKAGES[pkg].label,
      billing,
      addons: Array.from(addons).map((id) => ADDONS[id].label.nl),
      estimateMin: estimate.min,
      estimateMax: estimate.max,
      estimateMonthly: estimate.monthly,
      name,
      email,
      notes,
    };

    try {
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Webhook error');
      setStatus('sent');
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="liquid-glass rounded-3xl border border-white/10 p-8 md:p-10">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Left: configurator */}
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">{labels.step1}</div>
          <div className="grid grid-cols-3 gap-2 mb-8">
            {(Object.keys(PACKAGES) as PackageId[]).map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => setPkg(id)}
                className={`rounded-xl border px-3 py-4 text-center transition-all ${
                  pkg === id ? 'border-brand bg-brand/10' : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div className="font-bold text-sm">{PACKAGES[id].label}</div>
                <div className="text-[10px] text-white/40 mt-1">{PACKAGES[id].desc[lang]}</div>
              </button>
            ))}
          </div>

          <div className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">{labels.step2}</div>
          <div className="space-y-2 mb-8">
            {(Object.keys(ADDONS) as AddonId[]).map((id) => {
              const active = addons.has(id);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggleAddon(id)}
                  className={`w-full flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-all ${
                    active ? 'border-brand bg-brand/10' : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 ${
                        active ? 'bg-brand border-brand' : 'border-white/20'
                      }`}
                    >
                      {active && <Check className="w-3.5 h-3.5 text-black" />}
                    </span>
                    <span className="text-sm text-white/80">{ADDONS[id].label[lang]}</span>
                  </div>
                  <span className="text-xs text-white/40 whitespace-nowrap">
                    {ADDONS[id].monthly ? '€30/mo' : `${money(ADDONS[id].min)}–${money(ADDONS[id].max)}`}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">{labels.billing}</div>
          <div className="inline-flex bg-white/5 border border-white/10 rounded-full p-1">
            {(['onetime', 'subscription'] as const).map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setBilling(b)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase transition-all ${
                  billing === b ? 'bg-white text-black' : 'text-white/40 hover:text-white/60'
                }`}
              >
                {b === 'onetime' ? labels.onetime : labels.subscription}
              </button>
            ))}
          </div>
        </div>

        {/* Right: estimate + form */}
        <div className="flex flex-col">
          <div className="bg-black/30 rounded-2xl p-6 mb-6 border border-white/5">
            <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">{labels.estimate}</div>
            <div className="text-3xl md:text-4xl font-black text-white">
              {money(estimate.min)}
              {estimate.max !== estimate.min ? ` – ${money(estimate.max)}` : ''}
            </div>
            {estimate.monthly > 0 && (
              <div className="text-brand font-bold text-sm mt-1">
                + {money(estimate.monthly)} {labels.monthlyExtra}
              </div>
            )}
            <div className="text-white/30 text-xs mt-3 italic">{labels.estimateNote}</div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 flex-1">
            <input
              type="text"
              required
              placeholder={labels.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand transition-colors"
            />
            <input
              type="email"
              required
              placeholder={labels.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand transition-colors"
            />
            <textarea
              placeholder={labels.notesPlaceholder}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand transition-colors resize-none"
            />

            <button
              type="submit"
              disabled={status === 'sending' || status === 'sent'}
              className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-brand text-black font-bold text-sm px-6 py-3.5 transition-all hover:bg-brand/90 active:scale-[0.98] disabled:opacity-60"
            >
              {status === 'sending' && <Loader2 className="w-4 h-4 animate-spin" />}
              {status === 'sent' && <CheckCircle2 className="w-4 h-4" />}
              {status === 'error' && <AlertCircle className="w-4 h-4" />}
              {status === 'sending' ? labels.sending : status === 'sent' ? labels.sent : labels.submit}
            </button>

            <AnimatePresence>
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-red-400 text-xs text-center"
                >
                  {labels.error}
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </div>
  );
}
