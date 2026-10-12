import { MeshGradient } from "@paper-design/shaders-react";

/**
 * MeshBackground — sfondo animato.
 * Posizionato come fixed background layer in App.tsx,
 * in sostituzione del blocco video.
 */
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
          backgroundColor="#000000"
        />
        <MeshGradient
          className="absolute inset-0 w-full h-full opacity-40"
          colors={["#000000", "#3D81E3", "#06b6d4", "#0c0c0c"]}
          speed={0.15}
          backgroundColor="transparent"
        />
      </div>
    </div>
  );
}
