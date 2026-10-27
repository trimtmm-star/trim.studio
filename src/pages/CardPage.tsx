import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { UserPlus, MessageSquare, Mail, Phone, ArrowUpRight } from 'lucide-react';
import MeshBackground from '../components/MeshBackground';

/**
 * CardPage — digital business card, the target of the printed QR code
 * (ttrim.studio/card?utm_source=qr...). Save-to-contacts first, then the
 * direct channels and three strong projects.
 */
const PHONE = '+32451130597';
const PHONE_LABEL = '+32 451 13 05 97';

const PROJECTS = [
  { title: 'Kantara International', url: 'kantara-international.com', img: 'kantara-international' },
  { title: 'Detailing Bros', url: 'detailingbros.be', img: 'detailingbros' },
  { title: 'Pizza Truck Herri', url: 'pizzatruckherri.com', img: 'pizzatruckherri' },
];

// The client's moving hero (desktop recording) in a loop, played only while
// on screen. Reduced-motion users get the screenshot instead.
const still = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function HeroClip({ name, alt }: { name: string; alt: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => { e.isIntersecting ? v.play().catch(() => {}) : v.pause(); }, { rootMargin: '150px' });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  const cls = 'w-full aspect-[16/10] object-cover object-top';
  if (still) return <img src={`/work/${name}.jpg`} alt={alt} loading="lazy" width={1440} height={900} className={cls} />;
  return <video ref={ref} src={`/work/${name}.mp4`} poster={`/work/${name}.jpg`} muted loop playsInline preload="none" aria-label={alt} className={cls} />;
}

const rise = (i: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.1 + i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
});

export default function CardPage() {
  useEffect(() => {
    document.title = 'Trim Tahirsylaj — Card';
    return () => {
      document.title = 'Trim Tahirsylaj — Sites. Apps. Automation.';
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-clip text-white">
      <MeshBackground />

      <main className="relative z-10 max-w-md mx-auto px-5 pt-[calc(env(safe-area-inset-top)+3rem)] pb-16 flex flex-col items-center text-center">
        <motion.img
          {...rise(0)}
          src="https://i.postimg.cc/J0N6nT4h/LO.png"
          alt="ttrim.studio"
          referrerPolicy="no-referrer"
          className="w-20 h-20 object-contain"
        />
        <motion.h1 {...rise(1)} className="mt-6 text-4xl font-black tracking-tight">
          Trim Tahirsylaj
        </motion.h1>
        <motion.p {...rise(2)} className="mt-2 text-white/70 text-base">
          Crafted sites. Real apps. Smart automation.
        </motion.p>

        <motion.div {...rise(3)} className="mt-10 w-full flex flex-col gap-3">
          <a
            href="/trim-tahirsylaj.vcf"
            download="Trim-Tahirsylaj.vcf"
            className="w-full inline-flex items-center justify-center gap-3 rounded-2xl bg-white text-black font-bold text-base py-4 active:scale-[0.98] transition-transform"
          >
            <UserPlus className="w-5 h-5" /> Contact opslaan
          </a>
          <div className="grid grid-cols-3 gap-3">
            <a
              href={`https://wa.me/${PHONE.slice(1)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 rounded-2xl bg-white/10 border border-white/15 py-4 text-sm font-semibold active:scale-[0.98] transition-transform"
            >
              <MessageSquare className="w-5 h-5" /> WhatsApp
            </a>
            <a
              href={`tel:${PHONE}`}
              className="flex flex-col items-center gap-2 rounded-2xl bg-white/10 border border-white/15 py-4 text-sm font-semibold active:scale-[0.98] transition-transform"
            >
              <Phone className="w-5 h-5" /> Bellen
            </a>
            <a
              href="mailto:trimtmm@gmail.com"
              className="flex flex-col items-center gap-2 rounded-2xl bg-white/10 border border-white/15 py-4 text-sm font-semibold active:scale-[0.98] transition-transform"
            >
              <Mail className="w-5 h-5" /> E-mail
            </a>
          </div>
          <p className="mt-1 text-xs text-white/50 tracking-wide">{PHONE_LABEL} · trimtmm@gmail.com</p>
        </motion.div>

        <motion.div {...rise(4)} className="mt-14 w-full text-left">
          <div className="text-xs uppercase tracking-[0.25em] text-white/50 font-bold mb-4">Recent werk</div>
          <div className="flex flex-col gap-4">
            {PROJECTS.map((p) => (
              <a
                key={p.url}
                href={`https://${p.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-2xl overflow-hidden border border-white/10 bg-black/30"
              >
                <HeroClip name={p.img} alt={p.title} />
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="font-bold">{p.title}</span>
                  <ArrowUpRight className="w-4 h-4 text-white/60" />
                </div>
              </a>
            ))}
          </div>
        </motion.div>

        <Link
          to="/"
          className="mt-12 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-white/60 hover:text-white transition-colors"
        >
          ttrim.studio <ArrowUpRight className="w-4 h-4" />
        </Link>
      </main>
    </div>
  );
}
