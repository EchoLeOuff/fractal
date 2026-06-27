import Link from "next/link";

const FEATURES = [
  { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "15 analyses / jour" },
  { icon: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4", label: "Archives complètes" },
  { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", label: "Radar temps réel" },
];

export function PremiumBanner({ total }: { total: number }) {
  return (
    <div className="col-span-full rounded-lg border border-[rgba(16,185,129,0.15)] bg-gradient-to-br from-[rgba(16,185,129,0.06)] to-transparent p-8 text-center max-[480px]:p-6">
      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-md border border-[rgba(16,185,129,0.20)] bg-[rgba(16,185,129,0.08)] text-accent">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5">
          <path d="M3 11h18v11H3zM7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      </div>
      <h3 className="mb-2 font-display text-xl font-semibold">Accès complet gratuit</h3>
      <p className="mx-auto mb-6 max-w-sm text-[0.9375rem] text-secondary">
        Connectez-vous pour voir les {total} analyses du jour, les archives et le radar en temps réel.
      </p>
      <div className="mb-6 flex flex-wrap justify-center gap-x-8 gap-y-3">
        {FEATURES.map((f) => (
          <div key={f.label} className="flex items-center gap-2 text-[0.8125rem] text-secondary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-3.5 w-3.5 flex-shrink-0 text-accent">
              <path d={f.icon} />
            </svg>
            {f.label}
          </div>
        ))}
      </div>
      <Link
        href="/login"
        className="inline-flex items-center gap-2 rounded-sm bg-accent px-5 py-2.5 text-sm font-medium text-white transition-all hover:-translate-y-px hover:bg-accent-hover"
      >
        Se connecter gratuitement
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-3.5 w-3.5">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </Link>
    </div>
  );
}