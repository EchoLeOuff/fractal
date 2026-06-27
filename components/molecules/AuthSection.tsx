"use client";
import Link from "next/link";
import { useAuth } from "@/lib/auth";

// Fidèle à renderAuthUI() d'auth-guard.js : badge utilisateur + déconnexion,
// ou bouton "Se connecter" si non connecté.
export function AuthSection() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return <div className="h-8 w-20 animate-shimmer rounded-full bg-[linear-gradient(90deg,#111_0%,#171717_50%,#111_100%)] bg-[length:200%_100%]" />;
  }

  if (!user) {
    return (
      <Link href="/login" className="rounded-sm bg-accent px-5 py-2 text-sm font-medium text-white transition-all hover:-translate-y-px hover:bg-accent-hover">
        Se connecter
      </Link>
    );
  }

  const displayName = user.displayName || user.email?.split("@")[0] || "Compte";
  const initial = displayName[0]?.toUpperCase() ?? "?";

  return (
    <div className="flex items-center gap-2">
      <Link href="/compte" className="flex items-center gap-3 rounded-full border border-default bg-surface py-1 pl-1 pr-2.5 transition-all hover:border-strong hover:bg-elevated">
        <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-hover text-xs font-semibold text-white">
          {initial}
        </span>
        <span className="max-w-[7rem] truncate text-[0.8125rem] font-medium max-[768px]:hidden">{displayName}</span>
      </Link>
      <button
        onClick={() => logout()}
        title="Se déconnecter"
        className="flex h-8 w-8 items-center justify-center rounded-sm border border-[rgba(239,68,68,0.25)] bg-[rgba(239,68,68,0.06)] text-negative transition-all hover:border-[rgba(239,68,68,0.5)] hover:bg-[rgba(239,68,68,0.15)]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12h-9.5m7.5 3 3-3-3-3m-5-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2v-1" />
        </svg>
      </button>
    </div>
  );
}
