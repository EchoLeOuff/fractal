"use client";
import { usePathname } from "next/navigation";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { PageTransition } from "@/components/organisms/PageTransition";

const BARE = ["/login"];

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (BARE.some((p) => pathname.startsWith(p))) return <>{children}</>;
  return (
    <>
      <Header />
      <main><PageTransition>{children}</PageTransition></main>
      <Footer />
    </>
  );
}
