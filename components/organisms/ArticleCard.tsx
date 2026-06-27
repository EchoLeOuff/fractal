import Link from "next/link";
import { Badge, BadgeNew } from "@/components/atoms/Badge";
import { slugify } from "@/lib/data";
import type { Article } from "@/types/article";

function formatDate(d?: string): string {
  if (!d) return "—";
  try {
    return new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" });
  } catch { return "—"; }
}

const TEND_BAR: Record<string, string> = {
  "Haussière":        "bg-positive",
  "Baissière":        "bg-negative",
  "Forte Incertitude":"bg-warning",
  "Neutre":           "bg-[rgba(255,255,255,0.10)]",
};

const TEND_GLOW: Record<string, string> = {
  "Haussière":        "hover:shadow-[0_8px_32px_-8px_rgba(16,185,129,0.20)]",
  "Baissière":        "hover:shadow-[0_8px_32px_-8px_rgba(239,68,68,0.20)]",
  "Forte Incertitude":"hover:shadow-[0_8px_32px_-8px_rgba(245,158,11,0.20)]",
  "Neutre":           "hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.40)]",
};

export function ArticleCard({ article }: { article: Article }) {
  const meta = article._meta ?? {};
  const tendance = article.impact_financier.tendance_marche;

  return (
    <Link
      href={`/article/?slug=${slugify(article.titre_newsletter)}`}
      className={`group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-lg border border-[rgba(255,255,255,0.07)] bg-[rgba(10,15,11,0.60)] backdrop-blur-[12px] transition-all duration-[280ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-[rgba(255,255,255,0.13)] hover:bg-[rgba(14,20,15,0.75)] ${TEND_GLOW[tendance] ?? TEND_GLOW["Neutre"]}`}
    >
      {/* Barre couleur tendance */}
      <div className={`h-[2px] w-full flex-shrink-0 ${TEND_BAR[tendance] ?? TEND_BAR["Neutre"]}`} />

      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2">
          {meta.est_nouveau && <BadgeNew />}
          <Badge tendance={tendance} />
        </div>

        {/* Titre */}
        <h3 className="font-display text-[1rem] font-semibold leading-[1.4] tracking-[-0.015em] text-primary line-clamp-2">
          {article.titre_newsletter}
        </h3>

        {/* Synthèse */}
        <p className="flex-1 text-[0.8125rem] leading-[1.65] text-secondary line-clamp-3">
          {article.synthese_flash}
        </p>

        {/* Actifs */}
        {article.impact_financier.actifs_concernes?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {article.impact_financier.actifs_concernes.slice(0, 3).map((a) => (
              <span
                key={a}
                className="rounded-xs border border-[rgba(16,185,129,0.18)] bg-[rgba(16,185,129,0.07)] px-1.5 py-0.5 font-mono text-[0.625rem] font-medium text-accent"
              >
                {a}
              </span>
            ))}
            {article.impact_financier.actifs_concernes.length > 3 && (
              <span className="rounded-xs border border-[rgba(255,255,255,0.06)] px-1.5 py-0.5 font-mono text-[0.625rem] text-muted">
                +{article.impact_financier.actifs_concernes.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-[rgba(255,255,255,0.06)] pt-3">
          <span className="truncate pr-2 font-mono text-[0.625rem] text-muted">
            {meta.source ?? "—"} · {formatDate(meta.date_article)}
          </span>
          <div className="flex flex-shrink-0 items-center gap-2">
            {typeof meta.score_composite === "number" && (
              <span className="font-mono text-[0.625rem] font-semibold text-accent">
                {meta.score_composite.toFixed(2)}
              </span>
            )}
            <svg
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              className="h-3 w-3 text-tertiary opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}