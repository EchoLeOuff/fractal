import type { Tendance } from "@/types/article";

const MAP: Record<string, string> = {
  "Haussière": "text-positive bg-[rgba(16,185,129,0.08)] border-[rgba(16,185,129,0.20)]",
  "Baissière": "text-negative bg-[rgba(239,68,68,0.08)] border-[rgba(239,68,68,0.20)]",
  "Neutre": "text-tertiary bg-[rgba(255,255,255,0.03)] border-default",
  "Forte Incertitude": "text-warning bg-[rgba(245,158,11,0.08)] border-[rgba(245,158,11,0.20)]",
};
const DOT: Record<string, string> = {
  "Haussière": "bg-positive", "Baissière": "bg-negative",
  "Neutre": "bg-tertiary", "Forte Incertitude": "bg-warning",
};

export function Badge({ tendance }: { tendance: Tendance }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-xs border px-2 py-[0.1875rem] font-mono text-[0.6875rem] font-medium leading-[1.4] ${MAP[tendance] ?? MAP["Neutre"]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${DOT[tendance] ?? DOT["Neutre"]}`} />
      {tendance}
    </span>
  );
}

export function BadgeNew() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-xs border border-[rgba(16,185,129,0.20)] bg-[rgba(16,185,129,0.08)] px-2 py-[0.1875rem] font-mono text-[0.6875rem] font-medium leading-[1.4] text-accent">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      Nouveau
    </span>
  );
}
