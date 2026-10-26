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

export default function MeshBackground() {
  return (
    // Not position:fixed — iOS Safari paints its status bar and toolbar
    // with the colour of a fixed element touching the screen edge (black
    // bands). A sticky layer inside a page-tall container stays put while
    // scrolling and lets the real gradient show behind Safari's bars.
    <div className="pointer-events-none absolute inset-0 z-0">
      <div className="sticky top-0 h-[100lvh] w-full overflow-hidden">
        <MeshGradient
          className="absolute inset-0 w-full h-full"
          colors={["#000000", "#06b6d4", "#0891b2", "#164e63", "#f97316"]}
          speed={0.3}
          {...RENDER}
          backgroundColor="#000000"
        />
        <MeshGradient
          className="absolute inset-0 w-full h-full opacity-40"
          colors={["#000000", "#3D81E3", "#06b6d4", "#0c0c0c"]}
          speed={0.15}
          {...RENDER}
          backgroundColor="transparent"
        />
      </div>
    </div>
  );
}
