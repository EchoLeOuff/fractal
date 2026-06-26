"use client";
import { useAuth } from "@/lib/auth";
import { Label } from "@/components/atoms/Label";

export function CompteTemplate() {
  const { user, logout } = useAuth();
  if (!user) return null;

  const name = user.displayName || user.email?.split("@")[0] || "Compte";
  const initial = name[0]?.toUpperCase() ?? "?";
  const created = user.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })
    : "—";

  return (
    <section className="mx-auto max-w-4xl px-6 py-16 max-[768px]:px-4 max-[768px]:py-10">
      <Label>Mon compte</Label>

      {/* En-tête compte */}
      <div className="mb-6 mt-4 flex items-center gap-6 rounded-lg border border-subtle bg-surface p-8 max-[768px]:flex-col max-[768px]:text-center">
        <div className="flex h-[4.5rem] w-[4.5rem] flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-hover font-display text-[1.75rem] font-semibold text-white">
          {initial}
        </div>
        <div>
          <h2 className="mb-1 text-2xl">{name}</h2>
          <p className="text-sm text-secondary">{user.email}</p>
        </div>
      </div>

      {/* Bloc accès */}
      <div className="mb-6 rounded-lg border border-subtle bg-surface p-8">
        <h3 className="mb-5 border-b border-subtle pb-4 text-base">Mon accès</h3>
        <div className="flex items-center gap-4 rounded-md border border-[rgba(16,185,129,0.20)] bg-gradient-to-br from-[rgba(16,185,129,0.10)] to-[rgba(16,185,129,0.02)] p-5">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-[rgba(16,185,129,0.08)] text-accent">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5"><path d="M12 2 4 5v6c0 5.5 3.8 8.5 8 10 4.2-1.5 8-4.5 8-10V5l-8-3z" /></svg>
          </div>
          <div>
            <h4 className="mb-0.5 text-base">Accès complet</h4>
            <p className="text-[0.8125rem] text-secondary">Toutes les analyses, archives et radar temps réel.</p>
          </div>
        </div>
      </div>

      {/* Infos */}
      <div className="mb-6 rounded-lg border border-subtle bg-surface p-8">
        <h3 className="mb-5 border-b border-subtle pb-4 text-base">Informations</h3>
        <div className="grid grid-cols-3 gap-4 max-[768px]:grid-cols-1">
          <div className="rounded-md border border-subtle bg-elevated p-5 text-center">
            <div className="mb-1 font-mono text-[1.75rem] font-medium text-accent">{created}</div>
            <div className="text-xs text-tertiary">Membre depuis</div>
          </div>
        </div>
      </div>

      <button onClick={() => logout()} className="rounded-sm border border-[rgba(239,68,68,0.25)] bg-[rgba(239,68,68,0.06)] px-4 py-2.5 text-sm font-medium text-negative transition-all hover:border-[rgba(239,68,68,0.5)] hover:bg-[rgba(239,68,68,0.15)]">
        Se déconnecter
      </button>
    </section>
  );
}
