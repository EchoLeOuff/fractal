// lib/firebase.ts — Initialisation Firebase (SDK modulaire v10).
// La config Firebase côté client n'est pas secrète (visible dans tout site web
// Firebase) ; la vraie sécurité vient des règles + domaines autorisés en console.
// On lit depuis des variables d'env NEXT_PUBLIC_* pour ne pas coder en dur.
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// initializeApp une seule fois (évite l'erreur "duplicate app")
const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth: Auth = getAuth(app);
auth.languageCode = "fr";
export default app;
