// RadarBar.tsx — Barre de score avec 5 segments. invert=true pour la fiabilité (haute = bonne).
export function RadarBar({ name, value, invert = false }: { name: string; value: number; invert?: boolean }) {
  // Pour la fiabilité : valeur haute = vert. Pour volatilité/risque : valeur haute = rouge.
  const level = invert
    ? (value >= 4 ? "good" : value === 3 ? "neutral" : "bad")
    : (value <= 2 ? "good" : value === 3 ? "neutral" : "bad");

  const segmentColor = (i: number) => {
    if (i >= value) return "bg-[rgba(255,255,255,0.06)]";
    if (level === "good") return "bg-positive";
    if (level === "neutral") return "bg-warning";
    return "bg-negative";
  };

  const textColor =
    level === "good" ? "text-positive" :
    level === "neutral" ? "text-warning" :
    "text-negative";

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-[0.8125rem] text-secondary">{name}</span>
        <span className={`font-mono text-sm font-medium ${textColor}`}>{value}<span className="text-muted">/5</span></span>
      </div>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all ${segmentColor(i)}`}
          />
        ))}
      </div>
    </div>
  );
}