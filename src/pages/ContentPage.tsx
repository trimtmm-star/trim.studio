import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, MessageSquare, ChevronRight } from 'lucide-react';
import MeshBackground from '../components/MeshBackground';
import { pageByPath, LINK_LABELS, type Block, type ContentPage as Page } from '../content/pages';

/**
 * ContentPage — renders one entry of src/content/pages.ts (service, case
 * study or article). Plain markup, no entrance animations, so the
 * prerendered HTML is exactly what Google and the visitor see first.
 */
const WHATSAPP = 'https://wa.me/32451130597';

function BlockView({ b }: { b: Block; key?: number }) {
  if (b.type === 'p') return <p className="text-white/75 text-base md:text-lg leading-relaxed">{b.text}</p>;
  if (b.type === 'list')
    return (
      <ul className="space-y-2.5">
        {b.items.map((it) => (
          <li key={it} className="flex gap-3 text-white/80 text-base md:text-lg leading-relaxed">
            <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
            {it}
          </li>
        ))}
      </ul>
    );
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full text-left text-sm md:text-base">
        <thead className="bg-white/5">
          <tr>{b.head.map((h) => <th key={h} className="px-4 py-3 font-semibold text-white/90">{h}</th>)}</tr>
        </thead>
        <tbody>
          {b.rows.map((r) => (
            <tr key={r.join()} className="border-t border-white/10">
              {r.map((c, i) => <td key={i} className={`px-4 py-3 ${i === 0 ? 'font-semibold text-white' : 'text-white/75'}`}>{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ContentView({ page }: { page: Page }) {
  return (
    <div className="relative min-h-screen overflow-x-clip text-white selection:bg-brand/30">
      <MeshBackground />
      <div className="fixed top-0 left-0 right-0 z-50 pt-[calc(env(safe-area-inset-top)+1rem)] pb-3 bg-gradient-to-b from-[#163f48] via-[#163f48]/80 to-transparent">
        <div className="max-w-3xl mx-auto px-5 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest bg-white/10 hover:bg-white/15 border border-white/20 rounded-full px-4 py-2.5">
            <ArrowLeft className="w-3.5 h-3.5" /> ttrim.studio
          </Link>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest bg-white text-black rounded-full px-4 py-2.5">
            <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
          </a>
        </div>
      </div>

      <main className="relative z-10 max-w-3xl mx-auto px-5 pt-36 pb-32">
        <article>
          <div className="text-xs uppercase tracking-[0.25em] text-white/55 font-semibold mb-4">{page.eyebrow}</div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.05]">{page.h1}</h1>
          <p className="mt-6 text-lg md:text-xl text-white/85 leading-relaxed">{page.intro}</p>

          {page.media && (
            <a href={`https://${page.media.url}`} target="_blank" rel="noopener noreferrer" className="group mt-10 block rounded-2xl overflow-hidden border border-white/10 bg-black/40">
              {page.media.video ? (
                <video src={`/work/${page.media.img}.mp4`} poster={`/work/${page.media.img}.webp`} muted loop autoPlay playsInline className="w-full aspect-[16/10] object-cover object-top" aria-label={page.h1} />
              ) : (
                <img src={`/work/${page.media.img}.webp`} alt={`Website ${page.h1}`} width={1280} height={800} className="w-full aspect-[16/10] object-cover object-top" />
              )}
              <div className="flex items-center justify-between px-4 py-3 text-sm text-white/70">
                <span>{page.media.url}</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </a>
          )}

          {page.sections.map((s) => (
            <section key={s.h2} className="mt-14">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-5">{s.h2}</h2>
              <div className="space-y-4">{s.blocks.map((b, i) => <BlockView key={i} b={b} />)}</div>
            </section>
          ))}

          {page.faq && (
            <section className="mt-14">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-5">Veelgestelde vragen</h2>
              <div className="space-y-5">
                {page.faq.map((f) => (
                  <div key={f.q}>
                    <h3 className="font-semibold text-lg">{f.q}</h3>
                    <p className="mt-1.5 text-white/75 leading-relaxed">{f.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="mt-16 rounded-3xl border border-white/15 bg-white/[0.06] p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Een project in gedachten?</h2>
            <p className="mt-3 text-white/70">Stuur me een bericht. Je krijgt snel een antwoord en een duidelijke prijs.</p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-black font-semibold text-sm px-6 py-3.5">
                <MessageSquare className="w-4 h-4" /> Stuur een WhatsApp <ChevronRight className="w-4 h-4" />
              </a>
              <Link to="/pricing" className="inline-flex items-center justify-center rounded-full border border-white/20 text-sm font-semibold px-6 py-3.5 hover:border-white/40">
                Bekijk alle prijzen
              </Link>
            </div>
          </section>

          <nav className="mt-14" aria-label="Gerelateerd">
            <div className="text-xs uppercase tracking-[0.25em] text-white/55 font-semibold mb-4">Lees ook</div>
            <ul className="flex flex-wrap gap-3">
              {page.related.map((r) => (
                <li key={r}>
                  <Link to={r} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 hover:text-white hover:border-white/40">
                    {LINK_LABELS[r] ?? r} <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="mt-12 text-xs text-white/45">
            Trim Tahirsylaj · ttrim.studio · Evergem · Laatst bijgewerkt op {page.updated.split('-').reverse().join('/')}
          </p>
        </article>
      </main>
    </div>
  );
}

export default function ContentPage() {
  const { pathname } = useLocation();
  const page = pageByPath(pathname.replace(/\/$/, '') || '/');
  useEffect(() => {
    if (page) document.title = page.title;
  }, [page]);
  if (!page) return null;
  return <ContentView page={page} />;
}
