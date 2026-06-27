"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";
import { useAuth, authErrorMessage } from "@/lib/auth";

export function LoginTemplate() {
  const router = useRouter();
  const { user, login, signup, loginGoogle } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  // déjà connecté -> retour à l'accueil
  useEffect(() => { if (user) router.replace("/"); }, [user, router]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setBusy(true);
    try {
      if (mode === "login") await login(email, password);
      else await signup(email, password, name);
      router.replace("/");
    } catch (err) {
      setError(err instanceof FirebaseError ? authErrorMessage(err.code) : "Une erreur est survenue.");
    } finally { setBusy(false); }
  }

  async function google() {
    setError(""); setBusy(true);
    try { await loginGoogle(); router.replace("/"); }
    catch (err) { setError(err instanceof FirebaseError ? authErrorMessage(err.code) : "Erreur Google."); }
    finally { setBusy(false); }
  }

  return (
    <div className="flex min-h-screen flex-col bg-base" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, rgba(16,185,129,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(16,185,129,0.04) 0%, transparent 50%)" }}>
      <div className="flex items-center justify-between p-6">
        <Link href="/" className="inline-flex items-center gap-2 text-[0.8125rem] font-medium text-tertiary transition-colors hover:text-primary">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-3.5 w-3.5"><path d="m15 18-6-6 6-6" /></svg>
          Retour
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md animate-fade-in-up rounded-lg border border-default bg-surface px-8 py-10 max-[480px]:px-5 max-[480px]:py-6">
          <div className="mb-8 flex items-center justify-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md border border-[rgba(16,185,129,0.20)] bg-gradient-to-br from-accent to-accent-hover font-display font-bold text-white">F</div>
            <span className="font-display text-2xl font-semibold tracking-[-0.03em]">Fractal</span>
          </div>

          <h1 className="mb-2 text-center font-display text-2xl font-semibold tracking-[-0.02em]">
            {mode === "login" ? "Bon retour" : "Créer un compte"}
          </h1>
          <p className="mb-8 text-center text-sm text-secondary">
            {mode === "login" ? "Connectez-vous pour accéder à toutes les analyses." : "Gratuit. Accédez à toutes les éditions et au radar."}
          </p>

          {error && <div className="mb-4 rounded-md border border-[rgba(239,68,68,0.25)] bg-[rgba(239,68,68,0.08)] p-3 text-center text-[0.8125rem] text-negative">{error}</div>}

          <form onSubmit={submit} className="flex flex-col gap-4">
            {mode === "signup" && (
              <div>
                <label className="mb-2 block text-[0.8125rem] font-medium text-secondary">Nom</label>
                <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-md border border-default bg-elevated px-3.5 py-2.5 text-sm text-primary outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(16,185,129,0.08)]" placeholder="Votre nom" />
              </div>
            )}
            <div>
              <label className="mb-2 block text-[0.8125rem] font-medium text-secondary">E-mail</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-md border border-default bg-elevated px-3.5 py-2.5 text-sm text-primary outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(16,185,129,0.08)]" placeholder="vous@exemple.com" />
            </div>
            <div>
              <label className="mb-2 block text-[0.8125rem] font-medium text-secondary">Mot de passe</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-md border border-default bg-elevated px-3.5 py-2.5 text-sm text-primary outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(16,185,129,0.08)]" placeholder="••••••••" />
            </div>
            <button type="submit" disabled={busy} className="mt-2 rounded-sm bg-accent px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent-hover disabled:opacity-50">
              {busy ? "…" : mode === "login" ? "Se connecter" : "Créer mon compte"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-4 text-xs uppercase tracking-[0.08em] text-muted before:h-px before:flex-1 before:bg-subtle after:h-px after:flex-1 after:bg-subtle">ou</div>

          <button onClick={google} disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-sm border border-strong px-4 py-2.5 text-sm font-medium text-primary transition-all hover:border-tertiary hover:bg-elevated disabled:opacity-50">
            <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"/><path fill="#EA4335" d="M12 4.75c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.46 14.97.5 12 .5A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 4.75 12 4.75z"/></svg>
            Continuer avec Google
          </button>

          <p className="mt-6 text-center text-[0.8125rem] text-secondary">
            {mode === "login" ? "Pas encore de compte ? " : "Déjà inscrit ? "}
            <button onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }} className="font-medium text-accent hover:underline">
              {mode === "login" ? "Créer un compte" : "Se connecter"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
