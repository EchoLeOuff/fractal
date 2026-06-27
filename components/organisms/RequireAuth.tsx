"use client";
// Garde de route : équivalent de checkAuth(true) d'auth-guard.js.
// Redirige vers /login si non connecté.
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  if (loading) {
    return <div className="flex min-h-[60vh] items-center justify-center text-tertiary">Chargement…</div>;
  }
  if (!user) return null; // en cours de redirection
  return <>{children}</>;
}
