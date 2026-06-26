import Link from "next/link";
import { Badge, BadgeNew } from "@/components/atoms/Badge";
import { slugify } from "@/lib/data";
import type { Article } from "@/types/article";

function formatDate(d?: string): string {
  if (!d) return "—";
  try { return new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" }); }
  catch { return "—"; }
}

export function ArticleCard({ article }: { article: Article }) {
  const meta = article._meta ?? {};
  return (
    <Link
      href={`/article/?slug=${slugify(article.titre_newsletter)}`}
      className="group flex h-full cursor-pointer flex-col gap-4 rounded-lg border border-subtle bg-surface p-6 transition-all duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-strong hover:bg-elevated hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.5)]"
    >
      <div className="flex flex-wrap gap-2">
        {meta.est_nouveau && <BadgeNew />}
        <Badge tendance={article.impact_financier.tendance_marche} />
      </div>
      <h3 className="font-display text-[1.0625rem] font-semibold leading-[1.35] tracking-[-0.015em] text-primary">
        {article.titre_newsletter}
      </h3>
      <p className="flex-1 text-sm leading-[1.55] text-secondary">{article.synthese_flash}</p>
      <div className="flex items-center justify-between border-t border-subtle pt-3 font-mono text-[0.6875rem] text-muted">
        <span>{meta.source ?? "Source"} · {formatDate(meta.date_article)}</span>
        {typeof meta.score_composite === "number" && (
          <span className="text-sm font-medium text-accent">{meta.score_composite.toFixed(2)}</span>
        )}
      </div>
    </Link>
  );
}
