"use client";
import { useEffect, useState } from "react";
import type { Article, NewsletterData } from "@/types/article";

const DATA_URL = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/newsletter_data.json`;

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [updatedAt, setUpdatedAt] = useState<string>("—");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    fetch(`${DATA_URL}?t=${Date.now()}`, { cache: "no-store" })
      .then((r) => { if (!r.ok) throw new Error(`Erreur ${r.status}`); return r.json(); })
      .then((data: NewsletterData) => {
        if (!alive) return;
        setArticles(data.articles ?? []);
        setUpdatedAt(data.derniere_mise_a_jour ?? "—");
      })
      .catch((e) => alive && setError(e.message))
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, []);

  return { articles, updatedAt, loading, error };
}
