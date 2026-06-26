"use client";
import { useState } from "react";
import { useArticles } from "@/hooks/useArticles";
import { useSearch } from "@/hooks/useSearch";
import { ArticleCard } from "@/components/organisms/ArticleCard";
import { Label } from "@/components/atoms/Label";

export function SearchTemplate() {
  const { articles, loading } = useArticles();
  const [query, setQuery] = useState("");
  const results = useSearch(articles, query);

  return (
    <section className="mx-auto max-w-content px-6 py-16 max-[768px]:px-4 max-[768px]:py-10">
      <Label>Recherche</Label>
      <h1 className="mb-6 mt-4">Explorer les analyses</h1>

      {/* Barre de recherche */}
      <div className="mb-8 flex items-center gap-3 rounded-md border border-default bg-elevated px-4 py-3 focus-within:border-accent focus-within:shadow-[0_0_0_3px_rgba(16,185,129,0.08)]">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-[18px] w-[18px] flex-shrink-0 text-tertiary">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un article, un actif, une idée..."
          className="flex-1 border-none bg-transparent text-base text-primary outline-none placeholder:text-muted"
        />
      </div>

      <p className="mb-4 font-mono text-[0.6875rem] text-muted">
        {loading ? "Chargement…" : query.trim().length >= 2 ? `${results.length} résultat(s)` : `${articles.length} articles`}
      </p>

      {!loading && (
        results.length === 0 ? (
          <p className="py-16 text-center text-tertiary">Aucun résultat.</p>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-4">
            {results.map((a, i) => <ArticleCard key={`${a.titre_newsletter}-${i}`} article={a} />)}
          </div>
        )
      )}
    </section>
  );
}
