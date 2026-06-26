// atoms/RadarBar.tsx — Une barre du radar (5 segments). invert=true pour la fiabilité.
export function RadarBar({ name, value, invert = false }: { name: string; value: number; invert?: boolean }) {
  const good = invert ? value >= 4 : value <= 2;
  const color = value === 3 ? "bg-warn" : good ? "bg-emerald" : "bg-danger";
  const textColor = value === 3 ? "text-warn" : good ? "text-emerald-light" : "text-danger";
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-sm font-medium">{name}</span>
        <span className={`text-sm font-bold ${textColor}`}>{value}/5</span>
      </div>
      <div className="flex gap-1.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={`h-2 flex-1 rounded ${i <= value ? color : "bg-border"}`} />
        ))}
      </div>
    </div>
  );
}
