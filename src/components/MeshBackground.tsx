import { MeshGradient } from "@paper-design/shaders-react";

/**
 * MeshBackground — sfondo animato.
 * Posizionato come fixed background layer in App.tsx,
 * in sostituzione del blocco video.
 */
export default function MeshBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
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
  );
}
