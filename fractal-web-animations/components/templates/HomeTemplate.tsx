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

  return (
    <section className="mx-auto max-w-content px-6 py-16 max-[768px]:px-4 max-[768px]:py-10">
      {/* Hero meta */}
      <div className="mb-6 flex items-center justify-between border-b border-subtle pb-4">
        <span className="label-mono">Newsletter</span>
        <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(16,185,129,0.20)] bg-[rgba(16,185,129,0.08)] px-2.5 py-1 font-mono text-[0.6875rem] text-accent">
          <span className="h-1.5 w-1.5 animate-live-pulse rounded-full bg-accent" />
          <span>{loading ? "Chargement…" : updatedAt}</span>
        </div>
      </div>

      <h1 className="mb-4 max-w-3xl font-display text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.1] tracking-[-0.04em]">
        Analyses Fractales des Marchés.
      </h1>
      <p className="mb-10 max-w-xl text-[1.0625rem] leading-[1.6] text-secondary">
        Insights clairs, indépendants et sans concession. Générés par IA, validés par une méthodologie rigoureuse.
      </p>

      {/* Grille */}
      {loading ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-4">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-64 animate-shimmer rounded-sm bg-[linear-gradient(90deg,#111_0%,#171717_50%,#111_100%)] bg-[length:200%_100%]" />
          ))}
        </div>
      ) : error ? (
        <p className="py-16 text-center text-negative">{error}</p>
      ) : shown.length === 0 ? (
        <p className="py-16 text-center text-tertiary">Aucune édition disponible. Le pipeline se met à jour automatiquement.</p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-4">
          {shown.map((a, i) => <Reveal key={`${a.titre_newsletter}-${i}`} delay={Math.min(i * 60, 360)}><ArticleCard article={a} /></Reveal>)}
          {!isPremium && articles.length > 5 && <PremiumBanner total={articles.length} />}
        </div>
      )}
    </section>
  );
}
