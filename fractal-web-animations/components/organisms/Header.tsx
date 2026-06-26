"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AuthSection } from "@/components/molecules/AuthSection";

const NAV = [
  { href: "/", label: "Newsletter" },
  { href: "/radar", label: "Radar" },
  { href: "/archives", label: "Archives" },
  { href: "/apropos", label: "À propos" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-subtle bg-base/80 backdrop-blur-[12px] backdrop-saturate-150">
      <nav className="mx-auto flex max-w-content items-center justify-between gap-8 px-6 py-3">
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-75">
          <div className="flex h-7 w-7 items-center justify-center rounded-md border border-subtle bg-gradient-to-br from-accent to-accent-hover font-display text-sm font-bold text-white">F</div>
          <span className="font-display text-[1.0625rem] font-semibold tracking-tight max-[480px]:hidden">Fractal</span>
        </Link>

        <div className="flex items-center gap-1 max-[768px]:hidden">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href}
              className={`relative rounded-sm px-3 py-2 text-sm font-medium transition-colors hover:bg-elevated ${isActive(n.href) ? "text-primary" : "text-secondary hover:text-primary"}`}>
              {n.label}
              {isActive(n.href) && <span className="absolute -bottom-3 left-1/2 h-px w-4 -translate-x-1/2 bg-accent" />}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link href="/recherche" aria-label="Rechercher"
            className="inline-flex items-center gap-2 rounded-sm border border-default bg-surface px-3 py-1.5 text-[0.8125rem] text-secondary transition-colors hover:border-strong hover:bg-elevated hover:text-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-3.5 w-3.5">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <span className="max-[768px]:hidden">Rechercher</span>
          </Link>

          <AuthSection />

          <button onClick={() => setOpen((v) => !v)} aria-label="Menu"
            className="hidden h-9 w-9 flex-col items-center justify-center gap-1 rounded-sm border border-default max-[768px]:flex">
            <span className={`block h-[1.5px] w-4 bg-primary transition-transform ${open ? "translate-y-[5.5px] rotate-45" : ""}`} />
            <span className={`block h-[1.5px] w-4 bg-primary transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block h-[1.5px] w-4 bg-primary transition-transform ${open ? "-translate-y-[5.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {open && (
        <div className="flex flex-col border-t border-subtle bg-base px-6 py-4 min-[769px]:hidden">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)}
              className={`border-b border-subtle py-3 text-[0.9375rem] last:border-none ${isActive(n.href) ? "text-primary" : "text-secondary"}`}>
              {n.label}
            </Link>
          ))}
          <div className="mt-4"><AuthSection /></div>
        </div>
      )}
    </header>
  );
}
