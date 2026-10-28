import { useEffect, useState } from "react";
import { MeshGradient } from "@paper-design/shaders-react";

/**
 * MeshBackground — sfondo animato.
 * Posizionato come fixed background layer in App.tsx,
 * in sostituzione del blocco video.
 */
// A soft gradient looks the same at low resolution, so render each layer at
// ~720p and let the browser upscale it. The library default (min 2x pixel
// ratio, up to 4x Full HD per layer) made the two layers lag on most devices.
const RENDER = { minPixelRatio: 1, maxPixelCount: 1280 * 720 } as const;
// Phones: one animated layer at a lower resolution to keep scrolling smooth.
const RENDER_TOUCH = { minPixelRatio: 1, maxPixelCount: 540 * 960 } as const;

const isTouch =
  typeof window !== "undefined" &&
  window.matchMedia("(hover: none) and (pointer: coarse)").matches;
const reducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Static stand-in with the same palette, painted instantly while the WebGL
// gradient waits for the page to finish loading.
const PLACEHOLDER =
  "radial-gradient(60% 50% at 75% 20%, rgba(249,115,22,0.55), transparent 70%), radial-gradient(70% 60% at 20% 70%, rgba(6,182,212,0.6), transparent 70%), linear-gradient(160deg, #164e63, #0b2a33 60%, #000)";

export default function MeshBackground() {
  // Compiling the shaders blocks the main thread, so start them only after
  // load (and an idle moment) instead of competing with the first paint.
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const start = () => {
      const idle = (window as any).requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 200));
      idle(() => setReady(true), { timeout: 1500 });
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, []);

  return (
    // Not position:fixed — iOS Safari paints its status bar and toolbar
    // with the colour of a fixed element touching the screen edge (black
    // bands). A sticky layer inside a page-tall container stays put while
    // scrolling and lets the real gradient show behind Safari's bars.
    <div className="pointer-events-none absolute inset-0 z-0">
      <div className="sticky top-0 h-[100lvh] w-full overflow-hidden" style={{ background: PLACEHOLDER }}>
        {ready && <div className="absolute inset-0 animate-[fadein_1.2s_ease_forwards] opacity-0">
        <MeshGradient
          className="absolute inset-0 w-full h-full"
          colors={["#000000", "#06b6d4", "#0891b2", "#164e63", "#f97316"]}
          speed={reducedMotion ? 0 : 0.3}
          {...(isTouch ? RENDER_TOUCH : RENDER)}
          backgroundColor="#000000"
        />
        {!isTouch && <MeshGradient
          className="absolute inset-0 w-full h-full opacity-40"
          colors={["#000000", "#3D81E3", "#06b6d4", "#0c0c0c"]}
          speed={reducedMotion ? 0 : 0.15}
          {...RENDER}
          backgroundColor="transparent"
        />}
        </div>}
      </div>
    </div>
  );
}
