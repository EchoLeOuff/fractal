import Link from "next/link";

const FEATURES = ["15 analyses quotidiennes", "Accès aux archives", "Radar temps réel"];

export function PremiumBanner({ total }: { total: number }) {
  return (
    <div className="col-span-full rounded-lg border border-[rgba(16,185,129,0.20)] bg-gradient-to-br from-[rgba(16,185,129,0.08)] to-[rgba(16,185,129,0.02)] px-8 py-10 text-center">
      <h3 className="mb-3 text-2xl">Débloquez l&apos;accès complet</h3>
      <p className="mx-auto mb-6 max-w-lg text-secondary">
        Connectez-vous gratuitement pour accéder aux {total} analyses du jour, aux archives et au radar en temps réel.
      </p>
      <div className="mb-6 flex flex-wrap justify-center gap-x-6 gap-y-4">
        {FEATURES.map((f) => (
          <div key={f} className="flex items-center gap-2 text-[0.8125rem] text-secondary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="h-3.5 w-3.5 text-accent">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {f}
          </div>
        ))}
      </div>
      <Link href="/login" className="inline-flex rounded-sm bg-accent px-5 py-2.5 text-sm font-medium text-white transition-all hover:-translate-y-px hover:bg-accent-hover">
        Se connecter gratuitement
      </Link>
    </div>
  );
}
