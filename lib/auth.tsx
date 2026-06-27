"use client";
// lib/auth.tsx — Contexte d'authentification Firebase (remplace le stub du Lot 1).
import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword,
  signInWithPopup, GoogleAuthProvider, signOut, updateProfile, type User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

interface AuthState {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  loginGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthState>({
  user: null, loading: true,
  login: async () => {}, signup: async () => {}, loginGoogle: async () => {}, logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // suit l'état de connexion en continu (équivalent de checkAuth d'auth-guard.js)
    const unsub = onAuthStateChanged(auth, (u) => { setUser(u); setLoading(false); });
    return unsub;
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };
  const signup = async (email: string, password: string, name?: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (name) await updateProfile(cred.user, { displayName: name });
  };
  const loginGoogle = async () => {
    await signInWithPopup(auth, new GoogleAuthProvider());
  };
  const logout = async () => { await signOut(auth); };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, loginGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

// Traduit les codes d'erreur Firebase en messages FR lisibles.
export function authErrorMessage(code: string): string {
  const map: Record<string, string> = {
    "auth/invalid-email": "Adresse e-mail invalide.",
    "auth/user-not-found": "Aucun compte associé à cet e-mail.",
    "auth/wrong-password": "Mot de passe incorrect.",
    "auth/invalid-credential": "E-mail ou mot de passe incorrect.",
    "auth/email-already-in-use": "Un compte existe déjà avec cet e-mail.",
    "auth/weak-password": "Le mot de passe doit contenir au moins 6 caractères.",
    "auth/popup-closed-by-user": "Connexion Google annulée.",
    "auth/too-many-requests": "Trop de tentatives. Réessayez plus tard.",
  };
  return map[code] ?? "Une erreur est survenue. Réessayez.";
}
