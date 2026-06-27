// hooks/useSearch.ts — Recherche live côté client, faible complexité.
// L'index (texte minuscule par article) est construit UNE fois via useMemo,
// puis chaque frappe ne fait qu'un balayage O(N) avec includes().

import { useMemo } from "react";
import type { Article } from "@/types/article";

function buildText(a: Article): string {
  return [
    a.titre_newsletter,
    a.synthese_flash,
    a.contexte_macro_micro,
    a.impact_financier?.explication_impact,
    (a.impact_financier?.actifs_concernes ?? []).join(" "),
    a._meta?.source,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export function useSearch(articles: Article[], query: string, min = 2): Article[] {
  // index construit une seule fois par liste d'articles
  const index = useMemo(() => articles.map(buildText), [articles]);

  return useMemo(() => {
    const q = query.trim().toLowerCase();
    const tokens = q ? q.split(/\s+/).filter((t) => t.length >= min) : [];
    if (tokens.length === 0) return articles;

    const scored = articles
      .map((art, i) => ({ art, text: index[i], score: 0 }))
      .filter(({ text }) => tokens.every((t) => text.includes(t)));

    scored.forEach((r) => {
      const title = r.art.titre_newsletter.toLowerCase();
      let score = 0;
      tokens.forEach((t) => {
        if (title.includes(t)) score += 10; // priorité au titre
        score += (r.text.match(new RegExp(escapeRe(t), "g")) || []).length;
      });
      r.score = score;
    });

    return scored.sort((a, b) => b.score - a.score).map((r) => r.art);
  }, [articles, index, query, min]);
}
