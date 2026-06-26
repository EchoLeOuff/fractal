"use client";
import { useArticles } from "@/hooks/useArticles";
import { findBySlug } from "@/lib/data";
import { Badge } from "@/components/atoms/Badge";
import { AssetChips } from "@/components/molecules/AssetChips";
import { RadarGroup } from "@/components/molecules/RadarGroup";

export function ArticleTemplate({ slug }: { slug: string }) {
  const { articles, loading } = useArticles();
  if (loading) return <p className="py-20 text-center text-muted">Chargement…</p>;

  const article = findBySlug(articles, slug);
  if (!article) return <p className="py-20 text-center text-muted">Article introuvable.</p>;

  const a = article;
  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <Badge tendance={a.impact_financier.tendance_marche} />
      <h1 className="mb-4 mt-4 font-display text-4xl font-bold leading-tight">{a.titre_newsletter}</h1>
      <p className="mb-10 text-xl text-muted">{a.synthese_flash}</p>

      <Section title="Le contexte">{a.contexte_macro_micro}</Section>
      <Section title="La mécanique">{a.mecanique_de_l_evenement}</Section>

      <div className="mb-10">
        <h2 className="mb-3 font-display text-sm font-bold uppercase tracking-widest text-emerald-light">L'impact marché</h2>
        <div className="mb-4"><AssetChips actifs={a.impact_financier.actifs_concernes} /></div>
        <p className="leading-relaxed">{a.impact_financier.explication_impact}</p>
      </div>

      <div className="mb-10 rounded-2xl border border-border bg-surface p-6">
        <h2 className="mb-5 font-display text-sm font-bold uppercase tracking-widest text-emerald-light">Radar Fractal</h2>
        <RadarGroup radar={a.radar_fractal} />
      </div>

      <Section title="Le piège psychologique">{a.analyse_critique_et_biais.piege_psychologique}</Section>
      <Section title="Ce que le marché oublie">{a.analyse_critique_et_biais.ce_que_le_marche_oublie}</Section>
      <Section title="Le catalyseur à surveiller">{a.catalyseur_a_surveiller}</Section>

      <p className="mt-10 border-t border-border pt-6 text-xs leading-relaxed text-muted">{a.disclaimer}</p>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="mb-3 font-display text-sm font-bold uppercase tracking-widest text-emerald-light">{title}</h2>
      <p className="leading-relaxed">{children}</p>
    </div>
  );
}
