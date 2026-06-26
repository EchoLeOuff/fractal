"use client";
import { useEffect, useState } from "react";
import { ArticleTemplate } from "@/components/templates/ArticleTemplate";

// Page statique unique : lit ?slug= côté navigateur -> affiche n'importe quel
// article présent dans newsletter_data.json, y compris les tout nouveaux,
// sans avoir à reconstruire le site.
export default function ArticlePage() {
  const [slug, setSlug] = useState<string | null>(null);
  useEffect(() => {
    setSlug(new URLSearchParams(window.location.search).get("slug"));
  }, []);
  if (slug === null) return <p className="py-20 text-center text-muted">Chargement…</p>;
  return <ArticleTemplate slug={slug} />;
}
