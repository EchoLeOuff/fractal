export function AssetChips({ actifs }: { actifs: string[] }) {
  if (!actifs?.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {actifs.map((a) => (
        <span
          key={a}
          className="inline-flex items-center gap-1.5 rounded-xs border border-[rgba(16,185,129,0.20)] bg-[rgba(16,185,129,0.07)] px-2.5 py-1 font-mono text-xs font-medium text-accent"
        >
          <span className="h-1 w-1 rounded-full bg-accent opacity-70" />
          {a}
        </span>
      ))}
    </div>
  );
}