import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Sparkles, X, ArrowUp } from 'lucide-react';

/**
 * ChatWidget — the site assistant (POST /api/chat, streamed plain text).
 * Set ENABLED to false to hide it again; it then only appears after visiting
 * with ?chat=1 (remembered for the browser session), handy for testing.
 */
const ENABLED = true;

type Msg = { role: 'user' | 'assistant'; content: string };

// Plain-text answers with bare URLs, emails and the phone number made clickable.
const LINK = /(https?:\/\/[^\s)]+[^\s).,;:!?]|[\w.+-]+@[\w-]+\.[\w.]*\w|\+32 451 13 05 97)/g;
function Linkified({ text }: { text: string }) {
  return (
    <>
      {text.split(LINK).map((part, i) => {
        if (i % 2 === 0) return part;
        const href = part.startsWith('http') ? part : part.includes('@') ? `mailto:${part}` : 'https://wa.me/32451130597';
        return <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{part}</a>;
      })}
    </>
  );
}

const GREETING: Msg = {
  role: 'assistant',
  content: 'Hoi! Ik ben de AI-assistent van ttrim.studio. Vraag me gerust iets over websites, prijzen of automatisatie.',
};
const SUGGESTIONS = ['Wat kost een website?', 'Wat is het verschil tussen Care en Growth?', 'Bouwen jullie ook apps?'];

function allowed() {
  if (ENABLED) return true;
  try {
    if (new URLSearchParams(location.search).has('chat')) sessionStorage.setItem('chat', '1');
    return sessionStorage.getItem('chat') === '1';
  } catch {
    return false;
  }
}

export default function ChatWidget() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const list = useRef<HTMLDivElement>(null);

  useEffect(() => setShow(allowed()), []);
  useEffect(() => { list.current?.scrollTo({ top: list.current.scrollHeight }); }, [msgs, open]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || busy) return;
    const history: Msg[] = [...msgs.filter((m) => m !== GREETING), { role: 'user', content: q }];
    setMsgs([...msgs, { role: 'user', content: q }, { role: 'assistant', content: '' }]);
    setInput('');
    setBusy(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      });
      if (!res.body) throw new Error('no body');
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let answer = '';
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        answer += dec.decode(value, { stream: true });
        setMsgs((m) => [...m.slice(0, -1), { role: 'assistant', content: answer }]);
      }
    } catch {
      setMsgs((m) => [...m.slice(0, -1), { role: 'assistant', content: 'Er ging iets mis. Stuur Trim gerust een WhatsApp: +32 451 13 05 97.' }]);
    } finally {
      setBusy(false);
    }
  }

  const submit = (e: FormEvent) => { e.preventDefault(); send(input); };

  if (!show) return null;
  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Chat met de AI-assistent"
          className="fixed z-50 right-4 bottom-[calc(env(safe-area-inset-bottom)+5.5rem)] lg:bottom-6 w-14 h-14 rounded-full bg-white text-black shadow-2xl shadow-black/50 flex items-center justify-center active:scale-95 transition-transform"
        >
          <Sparkles className="w-6 h-6" />
        </button>
      )}
      {open && (
        <div className="fixed z-[60] inset-x-0 bottom-0 sm:inset-auto sm:right-6 sm:bottom-6 sm:w-[380px] h-[min(80svh,600px)] sm:rounded-3xl rounded-t-3xl bg-[#0d1416]/95 backdrop-blur border border-white/15 shadow-2xl shadow-black/60 flex flex-col text-white">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <div>
              <div className="font-bold">ttrim.studio</div>
              <div className="text-xs text-white/55">AI-assistent · antwoorden kunnen fouten bevatten</div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Sluiten" className="w-9 h-9 rounded-full hover:bg-white/10 flex items-center justify-center">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div ref={list} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${m.role === 'user' ? 'bg-white text-black' : 'bg-white/10 text-white/90'}`}>
                  {m.content ? <Linkified text={m.content} /> : <span className="inline-flex gap-1"><span className="animate-pulse">•</span><span className="animate-pulse [animation-delay:150ms]">•</span><span className="animate-pulse [animation-delay:300ms]">•</span></span>}
                </div>
              </div>
            ))}
            {msgs.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => send(s)} className="text-xs rounded-full border border-white/20 px-3 py-1.5 text-white/80 hover:border-white/50">
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={submit} className="p-3 border-t border-white/10 flex gap-2 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] sm:pb-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={1000}
              placeholder="Stel je vraag…"
              className="flex-1 bg-white/10 rounded-full px-4 py-2.5 text-sm placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
            />
            <button type="submit" disabled={busy || !input.trim()} aria-label="Versturen" className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center disabled:opacity-40">
              <ArrowUp className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
