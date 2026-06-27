"use client";
import Link from "next/link";
import { useArticles } from "@/hooks/useArticles";
import { findBySlug } from "@/lib/data";
import { Badge } from "@/components/atoms/Badge";
import { AssetChips } from "@/components/molecules/AssetChips";
import { RadarGroup } from "@/components/molecules/RadarGroup";
import type { Article } from "@/types/article";

function formatDate(d?: string): string {
  if (!d) return "—";
  try {
    return new Date(d).toLocaleDateString("fr-FR", {
      day: "2-digit", month: "long", year: "numeric",
    });
  } catch { return "—"; }
}

export function ArticleTemplate({ slug }: { slug: string }) {
  const { articles, loading } = useArticles();

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-4 h-4 w-24 animate-shimmer rounded-sm bg-[linear-gradient(90deg,#111_0%,#171717_50%,#111_100%)] bg-[length:200%_100%]" />
        <div className="mb-6 h-10 w-full animate-shimmer rounded-sm bg-[linear-gradient(90deg,#111_0%,#171717_50%,#111_100%)] bg-[length:200%_100%]" />
        <div className="space-y-3">
          {[1,2,3,4].map(i => (
            <div key={i} className="h-4 animate-shimmer rounded-sm bg-[linear-gradient(90deg,#111_0%,#171717_50%,#111_100%)] bg-[length:200%_100%]" style={{ width: `${80 + Math.sin(i) * 15}%` }} />
          ))}
        </div>
      </div>
    );
  }

  const article = findBySlug(articles, slug);
  if (!article) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.1em] text-accent">404</p>
        <h1 className="font-display text-2xl font-semibold">Article introuvable</h1>
        <Link href="/" className="text-sm text-tertiary hover:text-primary">← Retour à l'accueil</Link>
      </div>
    );
  }

  return <ArticleView article={article} />;
}

function ArticleView({ article: a }: { article: Article }) {
  const meta = a._meta ?? {};
  const tendance = a.impact_financier.tendance_marche;

  const accentColor =
    tendance === "Haussière" ? "rgba(16,185,129,0.15)" :
    tendance === "Baissière" ? "rgba(239,68,68,0.15)" :
    tendance === "Forte Incertitude" ? "rgba(245,158,11,0.15)" :
    "rgba(255,255,255,0.06)";

  return (
    <div className="mx-auto max-w-[72rem] px-6 pb-24 pt-12 max-[768px]:px-4 max-[768px]:pt-8">

      {/* Breadcrumb */}
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-tertiary transition-colors hover:text-primary">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-3 w-3"><path d="m15 18-6-6 6-6"/></svg>
          Newsletter
        </Link>
      </div>

      <div className="grid grid-cols-[1fr_300px] gap-12 max-[900px]:grid-cols-1">

        {/* ── COLONNE PRINCIPALE ── */}
        <article>

          {/* Header article */}
          <header className="mb-10">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge tendance={tendance} />
              {meta.est_nouveau && (
                <span className="inline-flex items-center gap-1.5 rounded-xs border border-[rgba(16,185,129,0.20)] bg-[rgba(16,185,129,0.08)] px-2 py-[0.1875rem] font-mono text-[0.6875rem] font-medium text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-live-pulse" /> Nouveau
                </span>
              )}
            </div>

            <h1 className="mb-5 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-primary">
              {a.titre_newsletter}
            </h1>

            <p className="mb-6 text-[1.0625rem] leading-[1.65] text-secondary">
              {a.synthese_flash}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-subtle pt-4 font-mono text-[0.6875rem] text-muted">
              {meta.source && <span className="text-tertiary">{meta.source}</span>}
              {meta.date_article && <span>· {formatDate(meta.date_article)}</span>}
              {typeof meta.score_composite === "number" && (
                <span className="ml-auto flex items-center gap-1.5">
                  <span className="text-muted">Score</span>
                  <span className="font-medium text-accent">{meta.score_composite.toFixed(2)}</span>
                </span>
              )}
            </div>
          </header>

          {/* Actifs */}
          {a.impact_financier.actifs_concernes?.length > 0 && (
            <div className="mb-8">
              <AssetChips actifs={a.impact_financier.actifs_concernes} />
            </div>
          )}

          {/* Corps de l'article */}
          <div className="space-y-0">
            <ArticleSection
              step="01"
              title="Contexte macro · micro"
              content={a.contexte_macro_micro}
            />
            <ArticleSection
              step="02"
              title="Mécanique de l'événement"
              content={a.mecanique_de_l_evenement}
            />
            <ArticleSection
              step="03"
              title="Impact sur les marchés"
              content={a.impact_financier.explication_impact}
              accent={accentColor}
            />

            {/* Analyse critique */}
            <div className="border-t border-subtle pt-8">
              <div className="mb-6">
                <p className="mb-1 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-accent">04 / Analyse</p>
                <h2 className="font-display text-xl font-semibold text-primary">Biais &amp; angles morts</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-md border border-subtle bg-surface p-5">
                  <p className="mb-2 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-warning">Piège psychologique</p>
                  <p className="text-sm leading-[1.65] text-secondary">{a.analyse_critique_et_biais.piege_psychologique}</p>
                </div>
                <div className="rounded-md border border-subtle bg-surface p-5">
                  <p className="mb-2 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-info">Ce que le marché oublie</p>
                  <p className="text-sm leading-[1.65] text-secondary">{a.analyse_critique_et_biais.ce_que_le_marche_oublie}</p>
                </div>
              </div>
            </div>

            <ArticleSection
              step="05"
              title="Catalyseur à surveiller"
              content={a.catalyseur_a_surveiller}
              highlight
            />
          </div>

          {/* Disclaimer */}
          <p className="mt-12 border-t border-subtle pt-6 font-mono text-[0.6875rem] leading-[1.8] text-muted">
            {a.disclaimer}
          </p>
        </article>

        {/* ── SIDEBAR ── */}
        <aside className="max-[900px]:order-first">
          <div className="sticky top-20 flex flex-col gap-4">

            {/* Radar Fractal */}
            <div className="overflow-hidden rounded-lg border border-subtle bg-surface">
              <div className="border-b border-subtle px-5 py-4">
                <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-tertiary">Radar Fractal</p>
              </div>
              <div className="p-5">
                <RadarGroup radar={a.radar_fractal} />
              </div>
            </div>

            {/* Source */}
            {meta.lien_source && (
              <a
                href={meta.lien_source}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-md border border-subtle bg-surface px-4 py-3 text-[0.8125rem] text-secondary transition-all hover:border-strong hover:bg-elevated hover:text-primary"
              >
                <span>Lire la source</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-3.5 w-3.5 flex-shrink-0">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            )}
          </div>
        </aside>

      </div>
    </div>
  );
}

function ArticleSection({
  step, title, content, accent, highlight,
}: {
  step: string;
  title: string;
  content: string;
  accent?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className="border-t border-subtle pt-8 pb-8"
      style={accent ? { borderLeftColor: accent.replace("0.15", "0.4"), borderLeftWidth: "2px", paddingLeft: "1.25rem", marginLeft: "-1.25rem" } : undefined}
    >
      <div className="mb-4">
        <p className="mb-1 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-accent">{step} /</p>
        <h2 className="font-display text-xl font-semibold text-primary">{title}</h2>
      </div>
      <p className={`text-[0.9375rem] leading-[1.75] ${highlight ? "text-primary" : "text-secondary"}`}>
        {content}
      </p>
    </div>
  );
}