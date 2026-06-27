import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.05)] px-6 py-12">
      <div className="mx-auto max-w-content">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-8">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="mb-3 flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-md border border-[rgba(16,185,129,0.25)] bg-[rgba(16,185,129,0.10)]">
                <span className="font-display text-xs font-bold text-accent">F</span>
              </div>
              <span className="font-display text-sm font-semibold text-primary">Fractal</span>
            </div>
            <p className="text-xs leading-[1.8] text-muted">
              Média indépendant de vulgarisation financière. Analyse IA, méthodologie rigoureuse, zéro conflit d'intérêt.
            </p>
          </div>

          {/* Nav */}
          <div className="flex flex-wrap gap-x-10 gap-y-6">
            <div>
              <p className="mb-3 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-tertiary">Contenu</p>
              <div className="flex flex-col gap-2">
                <Link href="/" className="text-sm text-secondary transition-colors hover:text-primary">Newsletter</Link>
                <Link href="/radar" className="text-sm text-secondary transition-colors hover:text-primary">Radar</Link>
                <Link href="/archives" className="text-sm text-secondary transition-colors hover:text-primary">Archives</Link>
              </div>
            </div>
            <div>
              <p className="mb-3 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-tertiary">À propos</p>
              <div className="flex flex-col gap-2">
                <Link href="/apropos" className="text-sm text-secondary transition-colors hover:text-primary">Méthodologie</Link>
                <Link href="/apropos" className="text-sm text-secondary transition-colors hover:text-primary">Mentions légales</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[rgba(255,255,255,0.05)] pt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-[0.625rem] text-muted">© 2025 Fractal · Média de vulgarisation financière · Aucun conseil en investissement</p>
          <p className="font-mono text-[0.625rem] text-muted">Données à titre informatif uniquement</p>
        </div>
      </div>
    </footer>
  );
}