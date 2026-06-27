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
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(255,255,255,0.06)] bg-[rgba(8,11,9,0.75)] backdrop-blur-[20px] backdrop-saturate-150">
      <nav className="mx-auto flex max-w-content items-center justify-between gap-8 px-6 py-3">

        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3 transition-opacity hover:opacity-80">
          <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-md border border-[rgba(16,185,129,0.30)] bg-[rgba(16,185,129,0.12)]">
            <span className="font-display text-sm font-bold text-accent">F</span>
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(16,185,129,0.15)] to-transparent" />
          </div>
          <div className="flex flex-col leading-none max-[480px]:hidden">
            <span className="font-display text-[0.9375rem] font-semibold tracking-tight text-primary">Fractal</span>
            <span className="font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-accent">Média financier</span>
          </div>
        </Link>

        {/* Nav desktop */}
        <div className="flex items-center gap-0.5 max-[768px]:hidden">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`relative rounded-sm px-3.5 py-2 text-[0.8125rem] font-medium transition-all duration-200
                ${isActive(n.href)
                  ? "text-primary"
                  : "text-secondary hover:bg-[rgba(255,255,255,0.05)] hover:text-primary"
                }`}
            >
              {n.label}
              {isActive(n.href) && (
                <span className="absolute bottom-0 left-1/2 h-[1.5px] w-5 -translate-x-1/2 rounded-full bg-accent" />
              )}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/recherche"
            aria-label="Rechercher"
            className="inline-flex items-center gap-2 rounded-sm border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-3 py-1.5 text-[0.8125rem] text-secondary transition-all hover:border-[rgba(255,255,255,0.14)] hover:bg-[rgba(255,255,255,0.07)] hover:text-primary"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-3.5 w-3.5">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <span className="max-[768px]:hidden">Rechercher</span>
          </Link>

          <AuthSection />

          {/* Burger mobile */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="hidden h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-sm border border-[rgba(255,255,255,0.08)] max-[768px]:flex"
          >
            <span className={`block h-[1px] w-4 bg-primary transition-all duration-200 ${open ? "translate-y-[6px] rotate-45" : ""}`} />
            <span className={`block h-[1px] w-4 bg-primary transition-all duration-200 ${open ? "opacity-0" : ""}`} />
            <span className={`block h-[1px] w-4 bg-primary transition-all duration-200 ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      {open && (
        <div className="flex flex-col border-t border-[rgba(255,255,255,0.06)] bg-[rgba(8,11,9,0.92)] px-6 py-4 min-[769px]:hidden">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className={`border-b border-[rgba(255,255,255,0.05)] py-3.5 text-[0.9375rem] last:border-none
                ${isActive(n.href) ? "text-primary font-medium" : "text-secondary"}`}
            >
              {n.label}
            </Link>
          ))}
          <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.05)]">
            <AuthSection />
          </div>
        </div>
      )}
    </header>
  );
}