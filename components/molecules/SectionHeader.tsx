import { Label } from "@/components/atoms/Label";
// .section-header de fractal.css : label à gauche, texte muted à droite, bordure basse
export function SectionHeader({ label, right }: { label: string; right?: string }) {
  return (
    <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4 border-b border-subtle pb-4">
      <Label>{label}</Label>
      {right && <span className="text-muted">{right}</span>}
    </div>
  );
}
