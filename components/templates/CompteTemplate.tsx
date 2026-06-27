"use client";
import { useAuth } from "@/lib/auth";
import { Label } from "@/components/atoms/Label";

export function CompteTemplate() {
  const { user, logout } = useAuth();
  if (!user) return null;

  const name = user.displayName || user.email?.split("@")[0] || "Compte";
  const initial = name[0]?.toUpperCase() ?? "?";
  const created = user.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString("fr-FR", {
        day: "2-digit", month: "long", year: "numeric",
      })
    : "—";

  return (
    <section className="mx-auto max-w-2xl px-6 py-16 max-[768px]:px-4 max-[768px]:py-10">
      <Label>Mon compte</Label>

      {/* Avatar + nom */}
      <div className="mb-5 mt-4 flex items-center gap-5 rounded-lg border border-subtle bg-surface p-6 max-[480px]:flex-col max-[480px]:text-center">
        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-hover font-display text-2xl font-semibold text-white">
          {initial}
        </div>
        <div className="min-w-0">
          <h2 className="mb-0.5 truncate font-display text-xl font-semibold text-primary">{name}</h2>
          <p className="truncate text-sm text-secondary">{user.email}</p>
        </div>
      </div>

      {/* Accès */}
      <div className="mb-5 rounded-lg border border-subtle bg-surface p-6">
        <p className="mb-4 border-b border-subtle pb-3 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-tertiary">
          Mon accès
        </p>
        <div className="flex items-center gap-4 rounded-md border border-[rgba(16,185,129,0.18)] bg-[rgba(16,185,129,0.06)] p-4">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md border border-[rgba(16,185,129,0.20)] bg-[rgba(16,185,129,0.10)] text-accent">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4">
              <path d="M12 2 4 5v6c0 5.5 3.8 8.5 8 10 4.2-1.5 8-4.5 8-10V5l-8-3z"/>
            </svg>
          </div>
          <div>
            <p className="mb-0.5 text-[0.9375rem] font-medium text-primary">Accès complet</p>
            <p className="text-[0.8125rem] text-secondary">Toutes les analyses, archives et radar temps réel.</p>
          </div>
        </div>
      </div>

      {/* Infos */}
      <div className="mb-5 rounded-lg border border-subtle bg-surface p-6">
        <p className="mb-4 border-b border-subtle pb-3 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-tertiary">
          Informations
        </p>
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-secondary">Membre depuis</span>
          <span className="font-mono text-sm font-medium text-primary">{created}</span>
        </div>
      </div>

      {/* Déconnexion */}
      <button
        onClick={() => logout()}
        className="flex items-center gap-2 rounded-sm border border-[rgba(239,68,68,0.20)] bg-[rgba(239,68,68,0.05)] px-4 py-2.5 text-sm font-medium text-negative transition-all hover:border-[rgba(239,68,68,0.45)] hover:bg-[rgba(239,68,68,0.12)]"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4">
          <path d="M20 12h-9.5m7.5 3 3-3-3-3m-5-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2v-1"/>
        </svg>
        Se déconnecter
      </button>
    </section>
  );
}