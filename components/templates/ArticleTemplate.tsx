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
        <div className="mb-4 h-3 w-20 animate-shimmer rounded-sm bg-[linear-gradient(90deg,rgba(10,15,11,0.8)_0%,rgba(16,24,18,0.9)_50%,rgba(10,15,11,0.8)_100%)] bg-[length:200%_100%]" />
        <div className="mb-6 h-9 w-4/5 animate-shimmer rounded-sm bg-[linear-gradient(90deg,rgba(10,15,11,0.8)_0%,rgba(16,24,18,0.9)_50%,rgba(10,15,11,0.8)_100%)] bg-[length:200%_100%]" />
        {[...Array(4)].map((_, i) => (
          <div key={i} className="mb-3 h-3 animate-shimmer rounded-sm bg-[linear-gradient(90deg,rgba(10,15,11,0.8)_0%,rgba(16,24,18,0.9)_50%,rgba(10,15,11,0.8)_100%)] bg-[length:200%_100%]"
            style={{ width: `${75 + (i % 3) * 10}%` }} />
        ))}
      </div>
    );
  }

  const article = findBySlug(articles, slug);
  if (!article) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.1em] text-accent">404</p>
        <h1 className="font-display text-2xl font-semibold text-primary">Article introuvable</h1>
        <Link href="/" className="text-sm text-tertiary transition-colors hover:text-primary">← Retour</Link>
      </div>
    );
  }

  return <ArticleView article={article} />;
}

function ArticleView({ article: a }: { article: Article }) {
  const meta = a._meta ?? {};
  const tendance = a.impact_financier.tendance_marche;

  const accentBorder =
    tendance === "Haussière" ? "rgba(16,185,129,0.35)" :
    tendance === "Baissière" ? "rgba(239,68,68,0.35)" :
    tendance === "Forte Incertitude" ? "rgba(245,158,11,0.35)" :
    "rgba(255,255,255,0.08)";

  return (
    <div className="mx-auto max-w-[72rem] px-6 pb-24 pt-10 max-[768px]:px-4">

      {/* Breadcrumb */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-tertiary transition-colors hover:text-primary"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-3 w-3">
            <path d="m15 18-6-6 6-6" />
          </svg>
          Newsletter
        </Link>
      </div>

      <div className="grid grid-cols-[1fr_290px] gap-10 max-[900px]:grid-cols-1">

        {/* ── ARTICLE ── */}
        <article>

          {/* Header */}
          <header className="mb-10">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge tendance={tendance} />
              {meta.est_nouveau && (
                <span className="inline-flex items-center gap-1.5 rounded-xs border border-[rgba(16,185,129,0.20)] bg-[rgba(16,185,129,0.08)] px-2 py-[0.1875rem] font-mono text-[0.6875rem] font-medium text-accent">
                  <span className="h-1.5 w-1.5 animate-live-pulse rounded-full bg-accent" />
                  Nouveau
                </span>
              )}
            </div>

            <h1 className="mb-5 font-display text-[clamp(1.625rem,3vw,2.375rem)] font-semibold leading-[1.18] tracking-[-0.03em] text-primary">
              {a.titre_newsletter}
            </h1>

            <p className="mb-6 text-[1.0625rem] leading-[1.7] text-secondary">
              {a.synthese_flash}
            </p>

            {/* Méta */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-md border border-[rgba(255,255,255,0.06)] bg-[rgba(10,15,11,0.50)] px-4 py-3 font-mono text-[0.6875rem] text-muted backdrop-blur-sm">
              {meta.source && (
                <span className="flex items-center gap-1.5 text-tertiary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-3 w-3">
                    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
                  </svg>
                  {meta.source}
                </span>
              )}
              {meta.date_article && (
                <span>{formatDate(meta.date_article)}</span>
              )}
              {typeof meta.score_composite === "number" && (
                <span className="flex items-center gap-1.5">
                  <span className="text-muted">Score Fractal</span>
                  <span className="font-semibold text-accent">{meta.score_composite.toFixed(2)}</span>
                </span>
              )}
              {/* Lien source */}
              {meta.lien_source && (
                <a
                  href={meta.lien_source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto flex items-center gap-1.5 text-accent transition-colors hover:text-primary"
                  onClick={(e) => e.stopPropagation()}
                >
                  Lire la source originale
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-3 w-3">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </a>
              )}
            </div>
          </header>

          {/* Actifs */}
          {a.impact_financier.actifs_concernes?.length > 0 && (
            <div className="mb-8">
              <AssetChips actifs={a.impact_financier.actifs_concernes} />
            </div>
          )}

          {/* Sections */}
          <div className="space-y-0 divide-y divide-[rgba(255,255,255,0.05)]">
            <ArticleSection step="01" title="Contexte macro · micro" content={a.contexte_macro_micro} />
            <ArticleSection step="02" title="Mécanique de l'événement" content={a.mecanique_de_l_evenement} />
            <ArticleSection step="03" title="Impact sur les marchés" content={a.impact_financier.explication_impact} accentBorder={accentBorder} />

            {/* Biais */}
            <div className="py-8">
              <div className="mb-5">
                <p className="mb-1 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-accent">04 /</p>
                <h2 className="font-display text-lg font-semibold text-primary">Biais &amp; angles morts</h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-md border border-[rgba(245,158,11,0.15)] bg-[rgba(245,158,11,0.05)] p-5 backdrop-blur-sm">
                  <p className="mb-2 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-warning">Piège psychologique</p>
                  <p className="text-[0.875rem] leading-[1.7] text-secondary">{a.analyse_critique_et_biais.piege_psychologique}</p>
                </div>
                <div className="rounded-md border border-[rgba(59,130,246,0.15)] bg-[rgba(59,130,246,0.05)] p-5 backdrop-blur-sm">
                  <p className="mb-2 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-info">Ce que le marché oublie</p>
                  <p className="text-[0.875rem] leading-[1.7] text-secondary">{a.analyse_critique_et_biais.ce_que_le_marche_oublie}</p>
                </div>
              </div>
            </div>

            <ArticleSection step="05" title="Catalyseur à surveiller" content={a.catalyseur_a_surveiller} highlight />
          </div>

          {/* Lien source en bas — bien visible */}
          {meta.lien_source && (
            <div className="mt-10">
              <a
                href={meta.lien_source}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-md border border-[rgba(16,185,129,0.20)] bg-[rgba(16,185,129,0.06)] px-5 py-3 text-[0.875rem] font-medium text-accent transition-all hover:border-[rgba(16,185,129,0.35)] hover:bg-[rgba(16,185,129,0.10)]"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4 flex-shrink-0">
                  <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
                </svg>
                <span>
                  Lire l'article original
                  {meta.source && <span className="ml-1.5 text-secondary font-normal">· {meta.source}</span>}
                </span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="ml-auto h-3.5 w-3.5 flex-shrink-0 text-tertiary">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            </div>
          )}

          {/* Disclaimer */}
          <p className="mt-10 border-t border-[rgba(255,255,255,0.05)] pt-6 font-mono text-[0.625rem] leading-[1.9] text-muted">
            {a.disclaimer}
          </p>
        </article>

        {/* ── SIDEBAR ── */}
        <aside className="max-[900px]:order-first">
          <div className="sticky top-20 flex flex-col gap-4">

            {/* Radar Fractal */}
            <div className="overflow-hidden rounded-lg border border-[rgba(255,255,255,0.07)] bg-[rgba(10,15,11,0.65)] backdrop-blur-[16px]">
              <div className="flex items-center gap-2 border-b border-[rgba(255,255,255,0.06)] px-5 py-3.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-3.5 w-3.5 text-accent">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
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
                className="flex items-center justify-between gap-3 rounded-md border border-[rgba(255,255,255,0.07)] bg-[rgba(10,15,11,0.60)] px-4 py-3.5 text-[0.8125rem] text-secondary backdrop-blur-sm transition-all hover:border-[rgba(255,255,255,0.13)] hover:bg-[rgba(14,20,15,0.75)] hover:text-primary"
              >
                <span className="truncate">Source · {meta.source}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-3.5 w-3.5 flex-shrink-0">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            )}

            {/* Score */}
            {typeof meta.score_composite === "number" && (
              <div className="rounded-md border border-[rgba(255,255,255,0.07)] bg-[rgba(10,15,11,0.60)] px-4 py-4 backdrop-blur-sm text-center">
                <p className="mb-1 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-tertiary">Score Fractal</p>
                <p className="font-mono text-3xl font-semibold text-accent">{meta.score_composite.toFixed(2)}</p>
                <p className="mt-1 font-mono text-[0.625rem] text-muted">/ 10 · pertinence × fraîcheur</p>
              </div>
            )}
          </div>
        </aside>

      </div>
    </div>
  );
}

function ArticleSection({
  step, title, content, accentBorder, highlight,
}: {
  step: string;
  title: string;
  content: string;
  accentBorder?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className="py-8"
      style={accentBorder ? {
        borderLeft: `2px solid ${accentBorder}`,
        paddingLeft: "1.25rem",
        marginLeft: "-1.25rem",
      } : undefined}
    >
      <div className="mb-4">
        <p className="mb-1 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-accent">{step} /</p>
        <h2 className="font-display text-lg font-semibold text-primary">{title}</h2>
      </div>
      <p className={`text-[0.9375rem] leading-[1.8] ${highlight ? "text-primary" : "text-secondary"}`}>
        {content}
      </p>
    </div>
  );
}