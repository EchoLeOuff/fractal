"use client";
import { useArticles } from "@/hooks/useArticles";
import { useAuth } from "@/lib/auth";
import { ArticleCard } from "@/components/organisms/ArticleCard";
import { Reveal } from "@/components/atoms/Reveal";
import { PremiumBanner } from "@/components/organisms/PremiumBanner";

export function HomeTemplate() {
  const { articles, updatedAt, loading, error } = useArticles();
  const { user } = useAuth();
  const isPremium = !!user;
  const shown = isPremium ? articles : articles.slice(0, 5);

  const haussiers = articles.filter(a => a.impact_financier.tendance_marche === "Haussière").length;
  const baissiers = articles.filter(a => a.impact_financier.tendance_marche === "Baissière").length;
  const incertains = articles.filter(a => a.impact_financier.tendance_marche === "Forte Incertitude").length;

  return (
    <div className="mx-auto max-w-content px-6 pb-24 pt-12 max-[768px]:px-4 max-[768px]:pt-8">

      {/* ── HERO ── */}
      <div className="mb-12">
        {/* Overline */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-[rgba(16,185,129,0.20)] bg-[rgba(16,185,129,0.08)] px-3 py-1.5">
            <span className="h-1.5 w-1.5 animate-live-pulse rounded-full bg-accent" />
            <span className="font-mono text-[0.625rem] font-medium uppercase tracking-[0.12em] text-accent">
              {loading ? "Chargement…" : `Mise à jour · ${updatedAt}`}
            </span>
          </div>
        </div>

        <h1 className="mb-5 max-w-3xl font-display text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-primary">
          L'actualité des marchés,{" "}
          <span className="text-accent">analysée par l'IA.</span>
        </h1>

        <p className="mb-8 max-w-lg text-[1.0625rem] leading-[1.7] text-secondary">
          Fractal scanne 30+ sources financières en continu et vous livre
          les analyses qui comptent — sans jargon, sans biais, sans publicité.
        </p>

        {/* Stats live */}
        {!loading && articles.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <div className="glass flex items-center gap-2 rounded-md px-3.5 py-2">
              <span className="h-2 w-2 rounded-full bg-positive" />
              <span className="font-mono text-xs text-secondary">
                <span className="font-semibold text-positive">{haussiers}</span> haussier{haussiers > 1 ? "s" : ""}
              </span>
            </div>
            <div className="glass flex items-center gap-2 rounded-md px-3.5 py-2">
              <span className="h-2 w-2 rounded-full bg-negative" />
              <span className="font-mono text-xs text-secondary">
                <span className="font-semibold text-negative">{baissiers}</span> baissier{baissiers > 1 ? "s" : ""}
              </span>
            </div>
            {incertains > 0 && (
              <div className="glass flex items-center gap-2 rounded-md px-3.5 py-2">
                <span className="h-2 w-2 rounded-full bg-warning" />
                <span className="font-mono text-xs text-secondary">
                  <span className="font-semibold text-warning">{incertains}</span> incertain{incertains > 1 ? "s" : ""}
                </span>
              </div>
            )}
            <div className="glass flex items-center gap-2 rounded-md px-3.5 py-2">
              <span className="font-mono text-xs text-secondary">
                <span className="font-semibold text-primary">{articles.length}</span> analyses
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ── SÉPARATEUR ── */}
      <div className="mb-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-[rgba(255,255,255,0.06)]" />
        <span className="label-mono">Édition du jour</span>
        <div className="h-px flex-1 bg-[rgba(255,255,255,0.06)]" />
      </div>

      {/* ── GRILLE ── */}
      {loading ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-72 animate-shimmer rounded-lg bg-[linear-gradient(90deg,rgba(10,15,11,0.8)_0%,rgba(16,24,18,0.9)_50%,rgba(10,15,11,0.8)_100%)] bg-[length:200%_100%]" />
          ))}
        </div>
      ) : error ? (
        <div className="glass rounded-lg p-12 text-center">
          <p className="text-negative">{error}</p>
        </div>
      ) : shown.length === 0 ? (
        <div className="glass rounded-lg p-16 text-center">
          <p className="text-tertiary">Aucune édition disponible. Le pipeline se met à jour automatiquement.</p>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
          {shown.map((a, i) => (
            <Reveal key={`${a.titre_newsletter}-${i}`} delay={Math.min(i * 50, 300)}>
              <ArticleCard article={a} />
            </Reveal>
          ))}
          {!isPremium && articles.length > 5 && (
            <PremiumBanner total={articles.length} />
          )}
        </div>
      )}
    </div>
  );
}