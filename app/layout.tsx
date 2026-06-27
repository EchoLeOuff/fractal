import type { Metadata } from "next";
import "@/styles/globals.css";
import { AuthProvider } from "@/lib/auth";
import { SiteChrome } from "@/components/organisms/SiteChrome";

export const metadata: Metadata = {
  title: "Fractal — Média financier",
  description: "L'actualité financière décryptée sans jargon.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <AuthProvider>
          <SiteChrome>{children}</SiteChrome>
        </AuthProvider>
      </body>
    </html>
  );
}
