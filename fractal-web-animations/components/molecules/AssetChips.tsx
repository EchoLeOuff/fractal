export function AssetChips({ actifs }: { actifs: string[] }) {
  if (!actifs?.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {actifs.map((a) => (
        <span key={a} className="rounded-lg border border-emerald/30 bg-emerald/10 px-3 py-1.5 text-sm font-medium text-emerald-light">
          {a}
        </span>
      ))}
    </div>
  );
}
