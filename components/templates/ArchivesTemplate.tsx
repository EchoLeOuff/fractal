"use client";
import { useState } from "react";
import Link from "next/link";
import { useArchives } from "@/hooks/useArchives";
import { Label } from "@/components/atoms/Label";

// NOTE Lot 3 : cette page était protégée (checkAuth(true)) -> on ajoutera le
// garde d'authentification (redirection /login si non connecté).

function fmtDate(d: string) {
  try { return new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" }); }
  catch { return d; }
}
function fmtTime(d: string) {
  try { return new Date(d).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }); }
  catch { return ""; }
}

export function ArchivesTemplate() {
  const { archives, loading, error } = useArchives();
  const [q, setQ] = useState("");
  const filtered = q.trim() ? archives.filter((a) => fmtDate(a.date).toLowerCase().includes(q.toLowerCase()) || a.file.toLowerCase().includes(q.toLowerCase())) : archives;

  return (
    <section className="mx-auto max-w-content px-6 py-16 max-[768px]:px-4 max-[768px]:py-10">
      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4 border-b border-subtle pb-4">
        <Label>Historique</Label>
        <span className="font-mono text-xs text-muted">{loading ? "—" : `${archives.length} édition${archives.length > 1 ? "s" : ""}`}</span>
      </div>

      <h1 className="mb-3">Archives Fractal</h1>
      <p className="mb-8 max-w-2xl text-secondary">Toutes les éditions passées, classées par date. Recherchez dans l&apos;historique complet.</p>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Filtrer par date…"
          className="rounded-md border border-default bg-elevated px-3.5 py-2.5 text-sm text-primary outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(16,185,129,0.08)]"
        />
        <Link href="/recherche" className="inline-flex items-center gap-2 rounded-sm border border-strong px-4 py-2.5 text-sm font-medium text-primary transition-colors hover:border-tertiary hover:bg-elevated">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-3.5 w-3.5"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
          Recherche avancée
        </Link>
      </div>

      {loading ? (
        <div className="flex flex-col gap-3">
          <div className="h-16 animate-shimmer rounded-sm bg-[linear-gradient(90deg,#111_0%,#171717_50%,#111_100%)] bg-[length:200%_100%]" />
          <div className="h-16 animate-shimmer rounded-sm bg-[linear-gradient(90deg,#111_0%,#171717_50%,#111_100%)] bg-[length:200%_100%]" />
        </div>
      ) : error ? (
        <p className="py-10 text-tertiary">Aucune archive disponible pour le moment.</p>
      ) : filtered.length === 0 ? (
        <p className="text-secondary">Aucune édition ne correspond à votre recherche.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((a) => (
            <div key={a.file} className="flex cursor-pointer items-center justify-between rounded-md border border-subtle bg-surface px-5 py-4 transition-all duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-x-1 hover:border-strong hover:bg-elevated">
              <div className="flex items-center gap-4">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-sm border border-[rgba(16,185,129,0.20)] bg-[rgba(16,185,129,0.08)] text-accent">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                </div>
                <div>
                  <h4 className="mb-0.5 text-[0.9375rem]">Édition du {fmtDate(a.date)}</h4>
                  <p className="font-mono text-xs text-muted">{fmtTime(a.date)} · {a.file}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 font-mono text-[0.8125rem] text-tertiary">
                <span>{a.articleCount ?? "—"} article{(a.articleCount ?? 0) > 1 ? "s" : ""}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-3.5 w-3.5"><path d="m9 18 6-6-6-6" /></svg>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
