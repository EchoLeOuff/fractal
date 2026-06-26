// lib/data.ts — Accès aux données. Le JSON est servi statiquement (public/),
// mais relu côté CLIENT à chaque visite -> les nouveaux articles scorés par le
// pipeline apparaissent sans reconstruire le site.

import type { Article, NewsletterData } from "@/types/article";

// En statique, le fichier est servi à la racine du site. basePath géré via env.
const DATA_URL = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/newsletter_data.json`;

export async function fetchArticles(): Promise<Article[]> {
  // cache: 'no-store' -> on relit toujours la dernière version produite par le Pi
  const res = await fetch(DATA_URL, { cache: "no-store" });
  if (!res.ok) throw new Error(`Chargement des articles impossible (${res.status})`);
  const data: NewsletterData = await res.json();
  return data.articles ?? [];
}

// Slug stable pour les URLs d'article (identique à la logique du render Python).
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60) || "article";
}

export function findBySlug(articles: Article[], slug: string): Article | undefined {
  return articles.find((a) => slugify(a.titre_newsletter) === slug);
}
